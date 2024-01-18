import { useState, useEffect } from '@wordpress/element';

// バリデーション関数をモジュールの外部に移動
export function isValidColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function isValidBorderStyle(style) {
  return ['solid', 'dashed', 'dotted'].includes(style);
}

export function isValidBorderWidth(width) {
  return /^[\d.]+(px|%)?$/.test(width);
}

export function isValidBorder(border) {
  console.log(border)
  if (!border || typeof border !== 'object') {
    console.error('Invalid border object: ', border); // エラー情報をコンソールに出力
    throw new Error('Invalid border object');
  }
  return (
    isValidColor(border.color) &&
    isValidBorderStyle(border.style) &&
    isValidBorderWidth(border.width)
  );
}

export function useBorderControl(attributes, setAttributes) {

  const [newBorderSetErrorMessage, setNewBorderSetErrorMessage] = useState(null);
  const [handleRangeChangeErrorMessage, setHandleRangeChangeErrorMessage] = useState(null);
  const [handleUnitChangeErrorMessage, setHandleUnitChangeErrorMessage] = useState(null);
  const borderColors = [
    { name: 'Blue 20', color: '#72aee6' },
  ];
  const defaultBorder = {
    color: '#72aee6',
    style: 'dashed',
    width: '1px',
  };
  const [borders, setBorders] = useState(attributes.borders || {
    top: defaultBorder,
    right: defaultBorder,
    bottom: defaultBorder,
    left: defaultBorder,
  });

  const units = [
    { label: 'px', value: 'px' },
    { label: '%', value: '%' },
  ];

  const onChangeBorder = (newBorderSet) => {
    try {
      if (
        isValidBorder(newBorderSet)
      ) {
        setNewBorderSetErrorMessage(null);
        const updatedBorders = {
          top: {
            ...borders.top,
            ...newBorderSet,
          },
          right: {
            ...borders.right,
            ...newBorderSet,
          },
          bottom: {
            ...borders.bottom,
            ...newBorderSet,
          },
          left: {
            ...borders.left,
            ...newBorderSet,
          }
        };
        setAttributes({ ...attributes, borders: updatedBorders });
        setBorders(updatedBorders);
        setErrorMessage(null);
      } else {
        setNewBorderSetErrorMessage('無効なボーダープロパティ');
      }
    } catch (error) {
      setNewBorderSetErrorMessage('無効なボーダープロパティ');
    }
  };


  useEffect(() => {
    if (attributes.borders) {
      setBorders(attributes.borders);
    }
  }, [attributes.borders]);


  const handleRangeChange = (newValue) => {
    const currentUnit = attributes.borderRadiusValue?.replace(/[0-9]/g, '') || 'px';
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setAttributes({ ...attributes, borderRadiusValue: `${newValue}${currentUnit}` });
      setHandleRangeChangeErrorMessage(null);
    } else {
      setHandleRangeChangeErrorMessage('有効な範囲ではありません');
    }
  };

  const handleUnitChange = (newUnit) => {
    if (units.some(option => option.value === newUnit)) {
      const currentValue = parseInt(attributes.borderRadiusValue || '0', 10);
      setAttributes({ ...attributes, borderRadiusValue: `${currentValue}${newUnit}` });
      setHandleUnitChangeErrorMessage(null);
    } else {
      setHandleUnitChangeErrorMessage('無効な単位です');
    }
  };

  return {
    borders,
    onChangeBorder,
    handleRangeChange,
    handleUnitChange,
    borderColors,
    units,
    newBorderSetErrorMessage, // newBorderSet 用のエラーメッセージ
    handleRangeChangeErrorMessage, // handleRangeChange 用のエラーメッセージ
    handleUnitChangeErrorMessage, // handleUnitChange 用のエラーメッセージ
  };
}

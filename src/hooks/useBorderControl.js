import { useState, useEffect } from '@wordpress/element';

// バリデーション関数をモジュールの外部に移動
export function isValidColor(color) {
  return color === undefined || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function isValidBorderStyle(style) {
  return ['none', 'solid', 'dashed', 'dotted'].includes(style);
}

export function isValidBorderWidth(width) {
  return /^[\d.]+(px|%)?$/.test(width);
}

export function isValidBorder(border) {
  if (!border || typeof border !== 'object') {
    console.error('Invalid border object: ', border);
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

  const [borders, setBorders] = useState(() => {
    // attributes.bordersがSplitモードの構造を持っているかをチェック
    if (attributes.borders && 
        typeof attributes.borders.top === 'object' &&
        typeof attributes.borders.right === 'object' &&
        typeof attributes.borders.bottom === 'object' &&
        typeof attributes.borders.left === 'object') {
      // Splitモードの場合はそのまま使用
      return attributes.borders;
    }
  
    // Splitモードの構造がなければ、各辺にデフォルトのFlatモードの設定を適用
    return {
      top: defaultBorder,
      right: defaultBorder,
      bottom: defaultBorder,
      left: defaultBorder,
    };
  });

  const units = [
    { label: 'px', value: 'px' },
    { label: '%', value: '%' },
  ];

  const isFlatMode = borders => {
    return borders && typeof borders.color === 'string' &&
      typeof borders.style === 'string' &&
      typeof borders.width === 'string';
  };

  const isSplitMode = borders => {
    return borders && typeof borders.top === 'object' &&
      typeof borders.right === 'object' &&
      typeof borders.bottom === 'object' &&
      typeof borders.left === 'object';
  };

  const onChangeBorder = (newBorderSet) => {
    try {
      let updatedBorders = {};

      if (isFlatMode(newBorderSet)) {
        // Flatモードの場合、すべての辺に同じ設定を適用
        updatedBorders = {
          top: newBorderSet,
          right: newBorderSet,
          bottom: newBorderSet,
          left: newBorderSet
        };
        // console.log('flat')
      } else if (isSplitMode(newBorderSet)) {
        // Splitモードの場合、各辺を個別に更新
        updatedBorders = {
          top: { ...borders.top, ...newBorderSet.top },
          right: { ...borders.right, ...newBorderSet.right },
          bottom: { ...borders.bottom, ...newBorderSet.bottom },
          left: { ...borders.left, ...newBorderSet.left }
        };
        // console.log('split')
      }

      // 更新されたボーダー設定を適用
      setAttributes({ ...attributes, borders: updatedBorders });
      setBorders(updatedBorders);
      setNewBorderSetErrorMessage(null);
    } catch (error) {
      console.error(error);
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

    const validUnits = units.map(option => option.value); // 有効な単位の一覧を取得
    if (validUnits.includes(newUnit)) { // 新しい単位が有効な単位の中に含まれているかチェック
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

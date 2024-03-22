import { useState, useEffect } from '@wordpress/element';

// バリデーション関数をモジュールの外部に移動
export function isValidColor(color) {
  return color === undefined || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function isValidBorderStyle(style) {
  return ['none', 'solid', 'dashed', 'dotted'].includes(style);
}

export function isValidBorderWidth(width) {
  // '0', '0px', '0%' を無効とし、それ以外の値を許容する
  return /^(?!0($|px|%))\d+(\.\d+)?(px|%)?$/.test(width);
}

export function isValidBorder(border) {
  // 単一のボーダー設定の検証
  const isValidSingleBorder = (border) => {
    return (
      isValidColor(border.color) &&
      isValidBorderStyle(border.style) &&
      isValidBorderWidth(border.width)
    );
  };

  // ボーダー設定がオブジェクトであるかチェック
  if (!border || typeof border !== 'object') {
    console.error('Invalid border object: ', border);
    return false;
  }

  // スプリットモード（複数の辺）の場合の検証
  if (['top', 'right', 'bottom', 'left'].every(side => border.hasOwnProperty(side))) {
    return ['top', 'right', 'bottom', 'left'].every(side => isValidSingleBorder(border[side]));
  }

  // フラットモード（単一の設定）の場合の検証
  return isValidSingleBorder(border);
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
         // 新しいボーダー設定が有効であるかチェック
    if (!isValidBorder(newBorderSet)) {
      throw new Error('無効なボーダープロパティ');
    }

      let updatedBorders = {};

      if (isFlatMode(newBorderSet)) {
        // Flatモードの場合、すべての辺に同じ設定を適用
        updatedBorders = {
          top: newBorderSet,
          right: newBorderSet,
          bottom: newBorderSet,
          left: newBorderSet
        };
      } else if (isSplitMode(newBorderSet)) {
        // Splitモードの場合、各辺を個別に更新
        updatedBorders = {
          top: { ...borders.top, ...newBorderSet.top },
          right: { ...borders.right, ...newBorderSet.right },
          bottom: { ...borders.bottom, ...newBorderSet.bottom },
          left: { ...borders.left, ...newBorderSet.left }
        };
      }
      
      console.log(updatedBorders)

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
};

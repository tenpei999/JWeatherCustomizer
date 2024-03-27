import { useState, useEffect } from '@wordpress/element';

/**
 * Checks if a given color is valid. A valid color is either undefined or matches a hex color format.
 */
export function isValidColor(color) {
  return color === undefined || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validates if the given border style is one of the allowed values.
 */
export function isValidBorderStyle(style) {
  return ['none', 'solid', 'dashed', 'dotted'].includes(style);
}

/**
 * Validates if the given border width is a positive number and optionally ends with 'px' or '%'.
 */
export function isValidBorderWidth(width) {
  return /^(?!0($|px|%))\d+(\.\d+)?(px|%)?$/.test(width);
}

/**
 * Validates if the provided border object has valid color, style, and width properties.
 * Supports validation for individual border sides when specified as top, right, bottom, and left properties.
 */
export function isValidBorder(border) {
  // Helper function to validate each border side or a single border when not split into sides.
  const isValidSingleBorder = (border) => {
    return (
      isValidColor(border.color) &&
      isValidBorderStyle(border.style) &&
      isValidBorderWidth(border.width)
    );
  };

  if (!border || typeof border !== 'object') {
    console.error('Invalid border object: ', border);
    return false;
  }

  // Validates all four sides if specified, otherwise validates the single border object.
  if (['top', 'right', 'bottom', 'left'].every(side => border.hasOwnProperty(side))) {
    return ['top', 'right', 'bottom', 'left'].every(side => isValidSingleBorder(border[side]));
  }

  return isValidSingleBorder(border);
}

/**
 * Custom hook to manage border settings and provide utility functions for changing these settings.
 */
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

  // Initialize borders state with attributes or defaults.
  const [borders, setBorders] = useState(() => {
    // Supports split mode with individual borders defined.
    if (attributes.borders &&
      typeof attributes.borders.top === 'object' &&
      typeof attributes.borders.right === 'object' &&
      typeof attributes.borders.bottom === 'object' &&
      typeof attributes.borders.left === 'object') {
      return attributes.borders;
    }

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

  // Checks if borders are defined in a flat mode (single border for all sides).
  const isFlatMode = borders => {
    return borders && typeof borders.color === 'string' &&
      typeof borders.style === 'string' &&
      typeof borders.width === 'string';
  };

  // Checks if borders are defined in a split mode (individual borders for each side).
  const isSplitMode = borders => {
    return borders && typeof borders.top === 'object' &&
      typeof borders.right === 'object' &&
      typeof borders.bottom === 'object' &&
      typeof borders.left === 'object';
  };

  // Function to update border settings and validate them. Provides error handling.
  const onChangeBorder = (newBorderSet) => {
    try {
      if (!isValidBorder(newBorderSet)) {
        throw new Error('無効なボーダープロパティ');
      }

      let updatedBorders = {};

      // Updates all borders if in flat mode or merges new settings with existing ones in split mode.
      if (isFlatMode(newBorderSet)) {
        updatedBorders = {
          top: newBorderSet,
          right: newBorderSet,
          bottom: newBorderSet,
          left: newBorderSet
        };
      } else if (isSplitMode(newBorderSet)) {
        updatedBorders = {
          top: { ...borders.top, ...newBorderSet.top },
          right: { ...borders.right, ...newBorderSet.right },
          bottom: { ...borders.bottom, ...newBorderSet.bottom },
          left: { ...borders.left, ...newBorderSet.left }
        };
      }

      setAttributes({ ...attributes, borders: updatedBorders });
      setBorders(updatedBorders);
      setNewBorderSetErrorMessage(null);
    } catch (error) {
      console.error(error);
      setNewBorderSetErrorMessage('無効なボーダープロパティ');
    }
  };

  // Effect hook to synchronize the component's border state with its attributes.
  useEffect(() => {
    if (attributes.borders) {
      setBorders(attributes.borders);
    }
  }, [attributes.borders]);

  // Handles changes in border radius value ensuring it falls within a valid range.
  const handleRangeChange = (newValue) => {
    const currentUnit = attributes.borderRadiusValue?.replace(/[0-9]/g, '') || 'px';
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setAttributes({ ...attributes, borderRadiusValue: `${newValue}${currentUnit}` });
      setHandleRangeChangeErrorMessage(null);
    } else {
      setHandleRangeChangeErrorMessage('有効な範囲ではありません');
    }
  };

   // Handles changes in the unit of border radius (px or %), ensuring it's a valid unit.
  const handleUnitChange = (newUnit) => {

    const validUnits = units.map(option => option.value);
    if (validUnits.includes(newUnit)) {
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
    newBorderSetErrorMessage,
    handleRangeChangeErrorMessage,
    handleUnitChangeErrorMessage,
  };
};

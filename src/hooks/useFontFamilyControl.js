import { useState, useEffect } from '@wordpress/element';

/**
 * A custom hook for managing the font family attribute in a JWeatherCustomizer block.
 * It synchronizes the font family state with the block's attributes and provides
 * a method to update both the local state and the block's font family attribute.
 *
 * @param {Object} attributes - The block's current attributes, including fontFamily.
 * @param {Function} setAttributes - A function provided by WordPress to update block attributes.
 * @returns {Object} - An object containing the current font family and a function to update it.
 */

export function useFontFamilyControl(attributes, setAttributes) {
  const [fontFamily, setFontFamily] = useState(attributes.fontFamily);

  useEffect(() => {
    setFontFamily(attributes.fontFamily);
  }, [attributes.fontFamily]);

    /**
   * Updates the font family state and the block's font family attribute.
   * This ensures the local state and block attribute are always in sync.
   *
   * @param {string} newFontFamily - The new font family to be applied.
   */
  const onChangeFontFamily = (newFontFamily) => {
    setFontFamily(newFontFamily);
    setAttributes({ fontFamily: newFontFamily });
  }

  return {
    fontFamily,
    onChangeFontFamily
  };
};


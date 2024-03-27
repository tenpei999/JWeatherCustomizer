import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import styles from '../objects/styles';

/**
 * Provides a control for selecting a font family from a predefined list of allowed fonts.
 * Validates the selected font and updates the parent component's state with the new selection.
 * Displays an error message if an invalid font is selected.
 * 
 * @param {Object} props The component props.
 * @param {string} props.fontFamily The current font family selected.
 * @param {Function} props.setFontFamily The function to update the font family in the parent component.
 */
function FontFamilyControl({ fontFamily, setFontFamily }) {

  // List of allowed fonts that users can select from.
  const allowedFonts = ["NotoSans, sans-serif", "NotoSerif, serif", "MPLUS1, sans-serif", "KosugiMaru, sans-serif", "SawarabiGothic, sans-serif"];
  const [error, setError] = useState('');

  // Validates if the selected font family is allowed.
  const isValidFontFamily = (font) => allowedFonts.includes(font);

    /**
   * Handles changes to the font family selection. Updates the parent component's state
   * with the new selection if it is valid, or sets an error message otherwise.
   * 
   * @param {string} newFontFamily The new font family selected by the user.
   */
  const handleOnChange = (newFontFamily) => {
    if (isValidFontFamily(newFontFamily)) {
      setFontFamily(newFontFamily);
      setError('');
    } else {
      setError('無効なフォントが選択されました');
    }
  };

  const changeFontLavel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> フォントを選択</span>
  );

  return (
    <>
      <div style={styles.formStyle} className='jwc-change-font'>
        <SelectControl
          label={changeFontLavel}
          value={fontFamily}
          options={[
            { label: 'Noto Sans JP', value: "NotoSans, sans-serif" },
            { label: 'Noto Serif JP', value: "NotoSerif, serif" },
            { label: 'M PLUS 1p', value: "MPLUS1, sans-serif" },
            { label: 'Kosugi Maru', value: "KosugiMaru, sans-serif" },
            { label: 'Sawarabi Gothic', value: "SawarabiGothic, sans-serif" }
          ]}
          onChange={handleOnChange}
        />
      </div>
      {error && <p style={styles.validErrorStyle}>{error}</p>}
    </>
  );
};

export default FontFamilyControl;

import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import styles from '../objects/styles';

function FontFamilyControl({ fontFamily, setFontFamily }) {

  const allowedFonts = ["NotoSans, sans-serif", "NotoSerif, serif", "MPLUS1, sans-serif", "KosugiMaru, sans-serif", "SawarabiGothic, sans-serif"];
  const [error, setError] = useState('');
  const isValidFontFamily = (font) => allowedFonts.includes(font);
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

// FontFamilyControl.js
import { SelectControl } from '@wordpress/components';

function FontFamilyControl({ fontFamily, setFontFamily }) {
  const handleOnChange = (newFontFamily) => {
    setFontFamily(newFontFamily);
  };

  const labelStyle = {
    width: '50%',
  }
  const formStyle = {
    width: '100%',
    textAlign: 'left',
    paddingTop: '15px',
  }

  const changeFontLavel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> フォントを選択</span>
  )

  return (
    <div style={formStyle} className='jwc-change-font'>
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
  );
}

export default FontFamilyControl;

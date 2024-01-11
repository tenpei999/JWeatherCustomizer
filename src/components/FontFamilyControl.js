// FontFamilyControl.js
import { SelectControl } from '@wordpress/components';

function FontFamilyControl({ fontFamily, setFontFamily }) {

  const allowedFonts = ["NotoSans, sans-serif", "NotoSerif, serif", "MPLUS1, sans-serif", "KosugiMaru, sans-serif", "SawarabiGothic, sans-serif"];
  const handleOnChange = (newFontFamily) => {
    // フォントが許可リストに含まれているか確認
    if (allowedFonts.includes(newFontFamily)) {
      setFontFamily(newFontFamily);
    } else {
      // 不正なフォントが選択された場合の処理を追加
      // 例: エラーメッセージを表示するなど
    }
  };

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

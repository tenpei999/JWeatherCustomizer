import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

function TextColorControl({ textColor, setTextColor, setAttributes }) {

  const [textColorChangeErrorMessage, setTextColorChangeErrorMessage] = useState(null);
  const handleOnChange = (newTextColor) => {
    const allowedColors = ['black', 'white'];
    if (allowedColors.includes(newTextColor)) {
      setTextColor(newTextColor);
      setAttributes({ textColor: newTextColor });
      
      // エラーメッセージをクリア
      setTextColorChangeErrorMessage(null);
    } else {
      // 不正なテキストの色が選択された場合の処理
      setTextColorChangeErrorMessage('無効なテキストの色が選択されました');
    }
  };

  const formStyle = {
    width: '100%',
    textAlign: 'left',
    paddingTop: '15px',
  }

  const textColorControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> テキストの色</span>
  )

  return (
    <>
      <div style={formStyle} className='jwc-text-color-control'>
        <SelectControl
          label={textColorControlLabel}
          value={textColor}
          options={[
            { label: '黒', value: 'black' },
            { label: '白', value: 'white' },
          ]}
          onChange={handleOnChange}
        />
      </div>
      {textColorChangeErrorMessage && <p style={validErrorStyle}>{textColorChangeErrorMessage}</p>}
    </>
  );
}

export default TextColorControl;

import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

function TextColorControl({ textColor, setAttributes }) {
  const [error, setError] = useState('');

  const isValidTextColor = (color) => ['black', 'white'].includes(color);

  const handleOnChangeTextColor = (newTextColor) => {
    if (isValidTextColor(newTextColor)) {
      setAttributes({ textColor: newTextColor });
      setError('');
    } else {
      setError('無効なテキストの色が選択されました');
    }
  };

  const formStyle = {
    width: '100%',
    textAlign: 'left',
    paddingTop: '15px',
  }

  const validErrorStyle = {
    color: 'red',
    transform: 'translateX(23%)'
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
          onChange={handleOnChangeTextColor}
        />
      </div>
      {error && <p style={validErrorStyle}>{error}</p>}
    </>
  );
}

export default TextColorControl;

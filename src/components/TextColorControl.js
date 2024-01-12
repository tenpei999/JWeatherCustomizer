// TextColorControl.js
import { SelectControl } from '@wordpress/components';

function TextColorControl({ textColor, setTextColor, setAttributes }) {
  const handleOnChange = (newTextColor) => {
    setTextColor(newTextColor);
    setAttributes({ textColor: newTextColor });
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
  );
}

export default TextColorControl;



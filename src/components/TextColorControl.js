import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

/**
 * Provides a control for selecting a text color. Validates the selected color
 * against a list of allowed values and updates the parent component's attributes
 * with the new selection. Displays an error message if an invalid color is selected.
 *
 * @param {Object} props - The component props.
 * @param {string} props.textColor - The current text color selected.
 * @param {Function} props.setAttributes - The function to update attributes in the parent component.
 */
function TextColorControl({ textColor, setAttributes }) {
  const [error, setError] = useState('');

  // Function to validate if the selected color is one of the allowed options.
  const isValidTextColor = (color) => ['black', 'white'].includes(color);

  // Handles changes to the text color selection. Updates the parent component's state if valid,
  // or sets an error message if invalid.
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
  };

  const validErrorStyle = {
    color: 'red',
    transform: 'translateX(23%)'
  };

  const textColorControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> テキストの色</span>
  );

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
};

export default TextColorControl;

import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import styles from '../objects/styles';

/**
 * A control component for selecting a font balance option.
 * It allows users to select an option and updates the parent component's state accordingly.
 * 
 * @param {Object} props Component properties.
 * @param {Object} props.selectedOption The currently selected option.
 * @param {Function} props.setSelectedOption Function to update the parent component's state with the selected option.
 * @param {Array} props.fontBalanceOptions An array of options for the font balance.
 * @returns JSX.Element The rendered component.
 */
const BalanceControl = ({
  selectedOption,
  setSelectedOption,
  fontBalanceOptions,
}) => {
  const [error, setError] = useState(''); // State for managing validation error messages.


  /**
   * Handles changes to the selected option. It validates the selection and updates the state accordingly.
   * If the selected option is valid, it updates the parent component's state; otherwise, sets an error message.
   * 
   * @param {string} label The label of the selected option.
   */
  const handleOptionChange = (label) => {
    const option = fontBalanceOptions.find(opt => opt.label === label);
    if (option) {
      setSelectedOption(option); // Update the parent component's state with the selected option.
      setError(''); // Clear any existing error message.
    } else {
      setError('選択されたオプションが見つかりません。');
    }
  };

  // Label for the balance control with custom styles applied.
  const balanceControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> バランス</span>
  )

  return (
    <div className="jwc-font-balance" style={styles.formStyle}>
      <SelectControl
        label={balanceControlLabel}
        value={selectedOption.label}
        options={fontBalanceOptions.map((opt) => ({ label: opt.label, value: opt.label }))}
        onChange={handleOptionChange} // Handler for when a new option is selected.
      />
      {error && <p style={styles.validErrorStyle}>{error}</p>}
    </div>
  );
};

export default BalanceControl;

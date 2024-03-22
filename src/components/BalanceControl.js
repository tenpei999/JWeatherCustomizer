import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import styles from '../objects/styles';

const BalanceControl = ({
  selectedOption,
  setSelectedOption,
  fontBalanceOptions,
}) => {
  const [error, setError] = useState('');

  const handleOptionChange = (label) => {
    const option = fontBalanceOptions.find(opt => opt.label === label);
    if (option) {
      setSelectedOption(option);
      setError('');
    } else {
      setError('選択されたオプションが見つかりません。');
    }
  };

  const balanceControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> バランス</span>
  )

  return (
    <div className="jwc-font-balance" style={styles.formStyle}>
      <SelectControl
        label={balanceControlLabel}
        value={selectedOption.label}
        options={fontBalanceOptions.map((opt) => ({ label: opt.label, value: opt.label }))}
        onChange={handleOptionChange}
      />
      {error && <p style={styles.validErrorStyle}>{error}</p>}
    </div>
  );
};

export default BalanceControl;

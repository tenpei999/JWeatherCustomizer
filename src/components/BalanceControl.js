import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

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

  const formStyle = {
    width: '100%',
    textAlign: 'center',
    textAlign: 'left',
    paddingTop: '15px',
  }

  const validErrorStyle = {
    color: 'red',
    transform: 'translateX(23%)'
  }

  const balanceControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> バランス</span>
  )

  return (
    <div className="jwc-font-balance" style={formStyle}>
      <SelectControl
        label={balanceControlLabel}
        value={selectedOption.label}
        options={fontBalanceOptions.map((opt) => ({ label: opt.label, value: opt.label }))}
        onChange={handleOptionChange}
      />
      {error && <p style={validErrorStyle}>{error}</p>}
    </div>
  );
};

export default BalanceControl;

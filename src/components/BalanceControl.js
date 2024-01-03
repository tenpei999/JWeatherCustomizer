import { SelectControl } from '@wordpress/components';

const BalanceControl = ({
  selectedOption,
  setSelectedOption,
  fontBalanceOptions,
}) => {

  const formStyle = {
    width: '100%',
    textAlign: 'center',
    textAlign: 'left',
    paddingTop: '15px',
  }

  const balanceControlLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> バランス</span>
  )

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="jwc-font-balance" style={formStyle}>
      <SelectControl
        label={balanceControlLabel}
        value={selectedOption.label}
        options={fontBalanceOptions.map((opt) => ({ label: opt.label, value: opt.label }))}
        onChange={(label) => {
          const option = fontBalanceOptions.find((opt) => opt.label === label);
          setSelectedOption(option);
        }}
      />
    </div>
  );
};

export default BalanceControl;
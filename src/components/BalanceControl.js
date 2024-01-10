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

  const handleOptionChange = (label) => {
    // 選択されたラベルに対応するオプションを見つけます
    const option = fontBalanceOptions.find((opt) => opt.label === label);

    // 正しいオプションが見つかった場合のみ、状態を更新します
    if (option) {
      setSelectedOption(option);
    } else {
      console.error('選択されたオプションが見つかりません。');
      // 必要に応じて、適切なデフォルト値やエラーハンドリングをここに追加します
    }
  };

  return (
    <div className="jwc-font-balance" style={formStyle}>
      <SelectControl
        label={balanceControlLabel}
        value={selectedOption.label}
        options={fontBalanceOptions.map((opt) => ({ label: opt.label, value: opt.label }))}
        onChange={handleOptionChange}
      />
    </div>
  );
};

export default BalanceControl;
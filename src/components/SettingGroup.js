import SelectCity from './SelectCity';
import VisibilityControl from './VisibilityControl';
import UIControlGroup from './UIControlGroup';

const SettingGroup = ({
  selectedCity,
  cityOptions,
  handleCityChange,
  visibilitySettings,
  fontFamily,
  onChangeFontFamily,
  textColor,
  setTextColor,
  selectedOption,
  setSelectedOption,
  fontBalanceOptions,
  attributes,
  setAttributes,
}) => {

  const wrapperStyle = {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
  };

  const spacing = {
    transform: 'translateX(-8.15%)',
  }

  const headingTitle = {
    textAlign: 'center',
  }

  return (
    <div style={wrapperStyle}>
      <h3 style={headingTitle}>設定</h3>
      <div style={spacing}>
        <SelectCity
          selectedCity={selectedCity}
          cityOptions={cityOptions}
          handleCityChange={handleCityChange}
        />
        <VisibilityControl settings={visibilitySettings} />
        <UIControlGroup
          fontFamily={fontFamily}
          onChangeFontFamily={onChangeFontFamily}
          textColor={textColor}
          setTextColor={setTextColor}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          fontBalanceOptions={fontBalanceOptions}
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </div>
    </div>
  );
};

export default SettingGroup;

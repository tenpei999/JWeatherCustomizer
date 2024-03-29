import SelectCity from './SelectCity';
import VisibilityControl from './VisibilityControl';
import UIControlGroup from './UIControlGroup';

/**
 * A container component that groups together various UI controls for settings.
 * This component encapsulates controls for selecting a city, adjusting visibility,
 * and modifying UI elements like font family and text color.
 * 
 * @param {Object} props - Props containing settings and handler functions.
 */

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

  const handleUpdateGroup1Count = (newCount) => {
    setAttributes({ onCountGroup1: newCount });
  };

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
        <VisibilityControl
          settings={visibilitySettings}
          onUpdateGroup1Count={handleUpdateGroup1Count}
        />
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
      <a className='licenseOfApi' href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
      <a className='licenseOfApi' href="https://opensource.org/license/mit">Holidays JP is licensed under the MIT license.</a>
    </div>
  );
};

export default SettingGroup;

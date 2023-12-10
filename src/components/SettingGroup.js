import { SelectControl } from '@wordpress/components';
import VisibilityControl from './VisibilityControl';
import UIControlGroup from './UICintrolGroup';

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
  return (
    <div className="checkbox-wrapper">
      <div className="detail-settings">
        <SelectControl
          label="都市を選択"
          value={selectedCity.name}
          options={cityOptions}
          onChange={handleCityChange}
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

import FontFamilyControl from './FontFamilyControl';
import TextColorControl from './TextColorControl';
import BackgroundSelector from './BackgroundSelector';
import BorderControlGroup from './BorderControlGroup';
import BalanceControl from './BalanceControl';

/**
 * Groups together various UI control components for setting font family, text color,
 * background style, border properties, and font balance. This allows for centralized
 * management of UI-related settings within a single component.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.fontFamily - The current font family.
 * @param {Function} props.onChangeFontFamily - Function to update the font family.
 * @param {string} props.selectedOption - The current selected option for font balance.
 * @param {Function} props.setSelectedOption - Function to update the selected font balance option.
 * @param {Array} props.fontBalanceOptions - The options available for font balance.
 * @param {Object} props.attributes - General attributes for UI control settings.
 * @param {Function} props.setAttributes - Function to update various UI control settings.
 * 
 * @returns JSX.Element - The rendered UI control group component.
 */

const UIControlGroup = ({
  fontFamily,
  onChangeFontFamily,
  selectedOption,
  setSelectedOption,
  fontBalanceOptions,
  attributes,
  setAttributes,
}) => {

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="detail-settings" style={wrapperStyle}>
      <BorderControlGroup
        attributes={attributes}
        setAttributes={setAttributes}
      />
      <FontFamilyControl
        fontFamily={fontFamily || attributes.fontFamily}
        setFontFamily={onChangeFontFamily}
      />
      <TextColorControl
        textColor={attributes.textColor}
        setAttributes={setAttributes}
      />
      <BalanceControl
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        fontBalanceOptions={fontBalanceOptions}
      />
      <BackgroundSelector attributes={attributes} setAttributes={setAttributes} />
    </div>
  );
};

export default UIControlGroup;

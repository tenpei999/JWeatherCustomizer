import FontFamilyControl from './FontFamilyControl';
import TextColorControl from './TextColorControl';
import BackgroundSelector from './BackgroundSelector';
import BorderControlGroup from './BorderControlGroup';
import BalanceControl from './BalanceControl';

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

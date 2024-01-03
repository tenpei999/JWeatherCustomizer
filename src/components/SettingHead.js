import UIControlGroup from './UIControlGroup';
import { useFontFamilyControl } from '../functions/useFontFamilyControl';
import { useChangeBalance } from '../functions/useChangeBalance';
import useBlockSelection from '../functions/useOutsideClick';
import { createVisibilitySettings } from '../objects/visibilitySettings';


const SettingHead = ({fontFamily, onChangeFontFamily, textColor, setSelectedOption, fontBalanceOptions, attributes, setAttributes }) => {

  const defaultCityObject = {
		name: '東京',
		url: 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14',
	};

  useChangeCity(selectedCity);
  const currentCityFromAttributes = attributes.selectedCity;
	const { fontFamily, onChangeFontFamily } = useFontFamilyControl(attributes, setAttributes);
	const [selectedMedia, setSelectedMedia] = useState(attributes.selectedMedia);
	const [textColor, setTextColor] = useState(attributes.textColor);
	const { showSelection, handleLayoutClick } = useBlockSelection();

  const {
		selectedOption,
		setSelectedOption,
		fontBalanceOptions,
		applyFontBalance
	} = useChangeBalance(attributes.balanceOption, setAttributes);

	useEffect(() => {
		// selectedMediaが変更されたときに実行されるコード
		if (selectedMedia !== attributes.selectedMedia) {
			setSelectedMedia(attributes.selectedMedia);
		}
	}, [attributes.selectedMedia]);

	useEffect(() => {
		if (attributes.selectedCity) {
			setSelectedCity(attributes.selectedCity);
		}
	}, [attributes.selectedCity]);

  return (
    <div className="setting-wrapper">
      <h3 className="setting-title__main">設定</h3>
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
  );
};

export default SettingHead;

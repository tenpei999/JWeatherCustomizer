/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';
import './editor.scss';
import './style.scss';
import SettingGroup from './components/SettingGroup';
import { useChangeCity } from './hooks/useChangeCity';
import useBlockSelection from './hooks/useOutsideClick';
import { createVisibilitySettings } from './objects/visibilitySettings';
import { cities } from './weatherDate/getSpotWeather';
import { useFontFamilyControl } from './hooks/useFontFamilyControl';
import { useChangeBalance } from './hooks/useChangeBalance';
import Preview from './components/Preview';

export default function Edit({ attributes, setAttributes }) {

	const defaultCityObject = {
		name: '東京',
		url: 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14',
	};

	const currentCityFromAttributes = attributes.selectedCity;
	const [selectedCity, setSelectedCity] = useState(currentCityFromAttributes || defaultCityObject);
	const ref = useRef(null);
	const { fontFamily, onChangeFontFamily } = useFontFamilyControl(attributes, setAttributes);
	const [textColor, setTextColor] = useState(attributes.textColor);
	const weatherData = useChangeCity(selectedCity);
	const visibilitySettings = createVisibilitySettings({ attributes, setAttributes });
	const [selectedMedia, setSelectedMedia] = useState(attributes.selectedMedia);
	const { showSelection, handleLayoutClick } = useBlockSelection();

	// ブロックにIDがない場合、生成して設定
	useEffect(() => {
		if (!attributes.uniqueID) {
			// ランダムなIDを生成
			const uniqueID = `block_${Math.random().toString(36).substr(2, 9)}`;
			setAttributes({ uniqueID });
		}
	}, []);

	const blockProps = useBlockProps({
		className: 'J-Weather-Customizer',
	});

	const cityOptions = Object.entries(cities).map(([key, city]) => ({
		label: city.name, // 'name'属性を表示テキストとして使用
		value: key,       // キー（都市名）を内部値として使用
	}));

	const handleCityChange = (selectedCityKey) => {
		const newSelectedCity = cities[selectedCityKey];
		setSelectedCity(newSelectedCity);
		setAttributes({ selectedCity: newSelectedCity }); // ここで新しい値を保存
	};

	useEffect(() => {
	}, [attributes]);

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
	useEffect(() => {
		// 天気データが取得された場合、それを属性に設定
		if (weatherData) {
			setAttributes({
				todayWeather: weatherData.today,
				tomorrowWeather: weatherData.tomorrow,
				weeklyWeather: weatherData.weekly
			});
		}
	}, [weatherData]);

	const commonProps = {
		borderRadius: attributes.borderRadiusValue,
		borders: attributes.borders,
		fontFamily: attributes.fontFamily,
		color: attributes.textColor,
		styleVariant: selectedOption.value,
		backgroundStyleType: attributes.backgroundStyleType,
		selectedMedia: selectedMedia,
		backgroundGradient: attributes.backgroundGradient,
		backgroundColor: attributes.backgroundColor,
		showHoliday: attributes.showHoliday,
		showPrecipitation: attributes.showPrecipitation,
	};

	return (
		<div {...blockProps} id={attributes.uniqueID} >
			<div onClick={handleLayoutClick} ref={ref}>
				{showSelection ? (
					<SettingGroup
						selectedCity={selectedCity}
						cityOptions={cityOptions}
						handleCityChange={handleCityChange}
						visibilitySettings={visibilitySettings}
						fontFamily={fontFamily}
						onChangeFontFamily={onChangeFontFamily}
						textColor={textColor}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						fontBalanceOptions={fontBalanceOptions}
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				) : (
					<Preview attributes={attributes} commonProps={commonProps} />
				)}
			</div>
		</div>
	);
}

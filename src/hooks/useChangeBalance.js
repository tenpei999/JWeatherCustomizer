import { useState, useEffect } from '@wordpress/element';

/**
 * A custom hook to manage and apply font balance options to JWeatherCustomizer blocks.
 * It allows selecting between predefined font balance options and applies the selected
 * option by adding a corresponding class to the elements of the current and weekly weather blocks.
 * 
 * @param {Object} initialOption - The initial font balance option to be used.
 * @param {Function} setAttributes - Function provided by WordPress to update block attributes.
 * @returns {Object} - An object containing the selected option, setter function for the option,
 * the list of all font balance options, and a function to apply the selected font balance.
 */
export function useChangeBalance(initialOption, setAttributes) {
  const defaultOption = { label: 'EmphasizeTheWeather', value: "EmphasizeTheWeather" };
  const [selectedOption, setSelectedOption] = useState(initialOption || defaultOption);

  // List of available font balance options.
  const fontBalanceOptions = [
    defaultOption,
    { label: 'EmphasizeTheTemperature', value: 'EmphasizeTheTemperature' },
    { label: 'Comfortable', value: 'Comfortable' },
    { label: 'data', value: 'data' },
    { label: 'Simple', value: 'Simple' },
  ];

  /**
 * Applies the selected font balance option by adding the corresponding class
 * to the elements of the current and weekly weather blocks. It first removes all
 * font balance classes before applying the new one to ensure cleanliness.
 * 
 * @param {Object} option - The font balance option to apply.
 */
  const applyFontBalance = (option) => {
    // Remove all font balance classes before applying the new one.
    fontBalanceOptions.forEach(opt => {
      document.querySelectorAll('.block--current').forEach(article => article.classList.remove(opt.value));
      document.querySelectorAll('.block--weekly').forEach(ul => ul.classList.remove(opt.value));
    });

    // Apply the selected font balance class if it's not the default option.
    if (option.value !== "default") {
      document.querySelectorAll('.block--current').forEach(article => article.classList.add(option.value));
      document.querySelectorAll('.block--weekly').forEach(ul => ul.classList.add(option.value));
    }
  };

  useEffect(() => {
    applyFontBalance(selectedOption);
    setAttributes({ balanceOption: selectedOption.value });
  }, [selectedOption]);

  return {
    selectedOption,
    setSelectedOption,
    fontBalanceOptions,
    applyFontBalance
  };
};

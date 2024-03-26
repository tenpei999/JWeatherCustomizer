import { SelectControl } from '@wordpress/components';
import PropTypes from 'prop-types'; 
import styles from '../objects/styles';

/**
 * Renders a select control for choosing a city from a list of options.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.selectedCity - The currently selected city.
 * @param {Array} props.cityOptions - An array of city options to choose from.
 * @param {Function} props.handleCityChange - The function to call when a new city is selected.
 * @returns JSX.Element - A rendered select control component for selecting a city.
 */

const SelectCity = ({ selectedCity, cityOptions, handleCityChange }) => {
  
  const selectedCityLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> 都市を選択</span>
  )

  return (
    <div style={styles.formStyle} className='jwc-select-city'>
      <SelectControl
        value={selectedCity.name}
        label={selectedCityLabel}
        options={cityOptions}
        onChange={handleCityChange}
        style={{ textAlign: 'center' }}
      />
    </div>
  );
};

// Define prop types for component validation.
SelectCity.propTypes = {
  selectedCity: PropTypes.shape({
    name: PropTypes.string.isRequired, // The name property of the selectedCity object must be a string.
  }).isRequired, // selectedCity object is required.
  cityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired, // Each city option must have a value property as a string.
      label: PropTypes.string.isRequired, // Each city option must have a label property as a string.
    })
  ).isRequired, // cityOptions array is required.
  handleCityChange: PropTypes.func.isRequired, // handleCityChange function is required.
};

export default SelectCity;

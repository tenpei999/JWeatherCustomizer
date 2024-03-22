import { SelectControl } from '@wordpress/components';
import PropTypes from 'prop-types'; 
import styles from '../objects/styles';

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

// プロパティのバリデーション
SelectCity.propTypes = {
  selectedCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  cityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleCityChange: PropTypes.func.isRequired,
};

export default SelectCity;

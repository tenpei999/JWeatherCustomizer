import { SelectControl } from '@wordpress/components';

const SelectCity = ({ selectedCity, cityOptions, handleCityChange }) => {

  const labelStyle = {
    width: '50%',
  }
  const formStyle = {
    width: '100%',
    textAlign: 'center',
    textAlign: 'left',
  }

  const selectedCityLabel = (
    <span style={{ display: 'block', transform: 'translateX(33%)' }}> 都市を選択</span>
  )

  return (
    <div style={formStyle} className='jwc-select-city'>
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

export default SelectCity;

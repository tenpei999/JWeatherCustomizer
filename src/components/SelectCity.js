import { SelectControl } from '@wordpress/components';

const SelectCity = ({ selectedCity, cityOptions, handleCityChange }) => {

  const boxStyle = {
    display: 'flex',
  }
  const labelStyle = {
    width: '50%',
  }
  const formStyle = {
    width: '50%',
    textAlign: 'center',
  }

  return (
    <div style={boxStyle}>
      <label style={labelStyle}>都市を選択:</label>
      <div style={formStyle}>
        <SelectControl
          value={selectedCity.name}
          options={cityOptions}
          onChange={handleCityChange}
          style={{textAlign: 'center'}}
        />
      </div>
    </div>
  );
};

export default SelectCity;

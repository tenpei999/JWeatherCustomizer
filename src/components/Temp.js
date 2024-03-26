/**
 * Displays the highest and lowest temperatures for a given day, along with temperature comparisons
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.weather - The weather data containing temperature information.
 * @returns JSX.Element | null - A list of temperature readings or null if the weather data is not valid.
 */

const Temp = ({ weather }) => {
  // Checks if the weather data is valid. If not, returns null to render nothing.
  if (!weather || typeof weather !== 'object') {
    return null;
  }

  return (
    <ul className="temp">
      <li className="highestAndComparison">
        <p className="highest">{weather.highestTemperature}<span className="celsius">℃</span></p>
        <p className="comparison">{weather.maximumTemperatureComparison}</p>
      </li>
      <li className="lowestAndComparison">
        <p className="lowest">{weather.lowestTemperature}<span className="celsius">℃</span></p>
        <p className="comparison">{weather.lowestTemperatureComparison}</p>
      </li>
    </ul>
  )
};

export default Temp;

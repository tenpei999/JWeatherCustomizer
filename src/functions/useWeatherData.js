import { useState } from '@wordpress/element';

export const useWeatherData = () => {
    const [cachedWeather ] = useState({

    });


    return cachedWeather;
};

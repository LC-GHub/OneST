const locForecastModel = require('../model/locForecastModel');

const findForecastsArea = (list, location) => {
    let locForecast;
    const normalizedLocation = normalizeString(location);
    const result = list.find(item => normalizeString(item.area) === normalizedLocation);
    
    if (!result) {
        return null
    }

    locForecast = new locForecastModel(result.area, result.forecast)
    return locForecast;
};

const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, '');

module.exports = findForecastsArea
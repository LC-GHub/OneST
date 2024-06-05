const findForecastsArea = (list, location) => {
    const normalizedLocation = normalizeString(location);
    console.log(normalizedLocation)
    const result = list.find(item => normalizeString(item.area) === normalizedLocation);
    return result ? result.forecast : "Area not found";
};

const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, '');

module.exports = findForecastsArea
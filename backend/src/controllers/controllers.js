const { response } = require('express');
const isValidUEN = require('../shared/isValidUEN');
const weatherquery = require('../shared/weatherquery');
const findForecastsArea = require('../shared/findForecastsArea');
const formatDateTime = require('../shared/formatDateTime');
const uenResponseModel = require('../model/uenResponseModel');
const weatherResponseModel = require('../model/weatherResponseModel');


const checkUEN = (req, res)=>{ 
	
    uen = req.body.uen
    if (!uen || uen === '') {
        const response = new uenResponseModel(false, "", "UEN cannot be blank")
        return res.status(200).json(response);
    }

    if (isValidUEN(uen)) {
        const response = new uenResponseModel(true, "UEN is valid", "");
        return res.status(200).json(response);
    } else {
        const response = new uenResponseModel(false, "Invalid UEN format", "");
        return res.status(200).json(response);
    }

} 

const processWeatherReq = async (req, res, next)=>{ 
    try {
        const { location } = req.query;
        const forecastResp = await weatherquery();

        if (!forecastResp.items || !forecastResp.items.length || !forecastResp.items[0].forecasts) {
            throw new Error("Invalid response format from weather query");
        }

        const forecast = findForecastsArea(forecastResp.items[0].forecasts, location);

        let response;

        if (!forecast) {
            response = new weatherResponseModel(false, location, "", "", "");
        } else {
            const validity_start = formatDateTime(forecastResp.items[0].valid_period.start);
            const validity_end = formatDateTime(forecastResp.items[0].valid_period.end);
            response = new weatherResponseModel(true, forecast.area, forecast.forecast, validity_start, validity_end);
        }
        res.json(response);
    } catch (error) {
        next(error);
    }
} 

module.exports = { 
	checkUEN, 
	processWeatherReq 
}

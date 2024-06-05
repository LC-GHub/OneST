const { response } = require('express');
const isValidUEN = require('../shared/isValidUEN');
const weatherquery = require('../shared/weatherquery');
const findForecastsArea = require('../shared/findForecastsArea');
const formatDateTime = require('../shared/formatDateTime');
const uenResponseModel = require('../model/uenResponseModel');
const weatherResponseModel = require('../model/weatherResponseModel');


const checkUEN = (req, res)=>{ 
	
    uen = req.body.uen
    if (!uen) {
        const response = new uenResponseModel(false, "", "UEN is required")
        return res.status(400).json(response);
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

        const forecast = findForecastsArea(forecastResp.items[0].forecasts, location)
        let response;

        if (!forecast) {
            console.log("HI")
            response = new weatherResponseModel(false, location, "", "", "")
        } else {
            const validity_start = formatDateTime(forecastResp.items[0].valid_period.start);
            const validity_end = formatDateTime(forecastResp.items[0].valid_period.end);
            response = new weatherResponseModel(true, location, forecast, validity_start, validity_end)
        }
        res.json(response);
    } catch (error) {
        next(error)
    }
} 

// Export of all methods as object 
module.exports = { 
	checkUEN, 
	processWeatherReq 
}

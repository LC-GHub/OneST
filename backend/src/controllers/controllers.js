const { response } = require('express');
const isValidUEN = require('../shared/isValidUEN');
const weatherquery = require('../shared/weatherquery');
const findForecastsArea = require('../shared/findForecastsArea');
const uenResponseModel = require('../model/uenResponseModel');


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
        const forecast = findForecastsArea(forecastResp.items[0].forecasts, location)
        console.log(forecast)
        res.send(forecastResp.items[0]);
    } catch (error) {
        next(error)
    }
} 

// Export of all methods as object 
module.exports = { 
	checkUEN, 
	processWeatherReq 
}

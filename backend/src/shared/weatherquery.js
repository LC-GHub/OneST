require('dotenv').config()
const axios = require('axios');

NEA_WEATHER_URL = process.env.WEATHER_URL
console.log(NEA_WEATHER_URL);

const weatherquery = async () => {
    try {
        const resp = await axios.get(NEA_WEATHER_URL);
        if (resp.status === 200) {
            console.log(resp.data);
            return resp.data;
        } else {
            throw new Error('Error ${resp.status}')
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = weatherquery;
const express = require('express');
require('dotenv').config()

const router = express.Router();
const { checkUEN, processWeatherReq } = require('../controllers/controllers');

FE_URL = process.env.FE_URL;
const postReqRec = "POST request received";

router.get('/', (req, res) => {
  res.redirect(FE_URL);
});

router.get('/healthcheck', (req, res) => {
    res.send('OK');
  });

router.post('/checkuen', checkUEN);

router.get('/weather', processWeatherReq)

module.exports = router;
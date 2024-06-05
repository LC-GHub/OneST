const express = require('express');

const router = express.Router();
const { checkUEN, processWeatherReq } = require('../controllers/controllers');


const postReqRec = "POST request received";

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/healthcheck', (req, res) => {
    res.send('OK');
  });

router.post('/checkuen', checkUEN);

router.get('/weather', processWeatherReq)

module.exports = router;
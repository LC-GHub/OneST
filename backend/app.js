const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const routes = require('./src/routes/routes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use('/', routes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`OneST app listening at http://localhost:${port}`);
});

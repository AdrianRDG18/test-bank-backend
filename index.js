const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

app.use(express.json());

dbConnection();

app.use(cors());

//Routes
app.use('/api/currency', require('./routes/currency.route'));

app.listen(process.env.APP_PORT, () => console.log('Running in port:' + process.env.APP_PORT));
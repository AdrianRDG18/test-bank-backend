const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.listen(process.env.APP_PORT, () => console.log('Running in port:' + process.env.APP_PORT));
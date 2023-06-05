const express = require('express');
const dbConnection = require('./config/db');


const app = express();

//add body parser
app.use(express.json());

const db = dbConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`The server has started on port ${PORT}`);
});

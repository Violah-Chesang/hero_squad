const express = require('express');
const cors = require('cors'); // Import the 'cors' package
const dbConnection = require('./config/db');
const heroRouter = require('./models/hero');



const app = express();

// Enable CORS
app.use(cors());

//add body parser
app.use(express.json());
app.use(heroRouter);

const db = dbConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`The server has started on port ${PORT}`);
});

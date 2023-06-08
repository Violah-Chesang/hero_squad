const express = require('express');
const cors = require('cors'); // Import the 'cors' package
const dbConnection = require('./config/db');
const heroRouter = require('./routes/hero');
const squadRouter = require('./routes/squad');
const strengthRouter = require('./routes/strength');
const weaknessRouter = require('./routes/weakness');


const app = express();

// Enable CORS
app.use(cors());

//add body parser
app.use(express.json());
app.use(heroRouter);
app.use(squadRouter);
app.use(strengthRouter);
app.use(weaknessRouter);

const db = dbConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`The server has started on port ${PORT}`);
});

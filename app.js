const express = require('express');

const app = express();

//add body parser
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`The server has started on port ${PORT}`);
});

const mongoose = require('mongoose');

function getDbConnection(){

    const DB_URL = process.env.DB_URL;

    let options = {
        family : 4
    };

    mongoose.connect(DB_URL, options);

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log('Failed to connect to the server!')
        console.log(err);
    });

    db.once('open', (event)=>{
        console.log('Connection to the server successful!')
    });



    return db;
}
module.exports = getDbConnection;
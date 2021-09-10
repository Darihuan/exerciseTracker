const mongoose = require('mongoose');
require('dotenv').config({path: './db.env'});
try {
    mongoose.connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("DATABASE READY");
    })
} catch (error) {
    console.log("error on db conection");
}
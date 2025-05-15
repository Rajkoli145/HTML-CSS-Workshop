const mongoose = require('mongoose');
require('dotenv').config();
const REMOTE_DB_URL = process.env.REMOTE_DB_URL;

mongoose.connect(REMOTE_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('connected', function () {
    console.log("Database connected...");
});

db.on('disconnected', function () {
    console.log("Database disconnected...");
});

db.on('error', function () {
    console.log("Something went wrong...");
});

module.exports = db;
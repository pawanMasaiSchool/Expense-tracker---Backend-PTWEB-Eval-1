const mongoose = require('mongoose');

const conncetingToDb = () => {
    return mongoose.connect("mongodb://localhost:27017/tracker")
}

module.exports = conncetingToDb
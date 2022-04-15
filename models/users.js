var mongoose = require('mongoose')

var last_tripsSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
})

var userSchema = mongoose.Schema({
    name: String,
    firstname : String,
    email: String,
    password: String,
    last_trips: [last_tripsSchema],
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;

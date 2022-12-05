const mongoose = require('mongoose');

const TripsSchema =mongoose.Schema({
 city:{type: String, required: true, minlength: 2, maxlength:50},
 category:{type: String, required: true, minlength: 2, maxlength:50},
 image:{type: String, minlength: 2, maxlength:100},
 reserve : {type: Boolean, default: false},
 details : {type: String, minlength: 2, maxlength:100}
})

module.exports= mongoose.model('Trips', TripsSchema);
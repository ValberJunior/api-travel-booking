const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type:String, required:true, minlength: 3, maxlength: 100},
    email: {type:String, required:true, minlength: 3, maxlength: 100},
    cpf: {type:String, required:true, minlength: 11, maxlength: 14},
    phone: { type: String, minlength: 10, maxlength: 16 },
    password: {type:String, required:true, minlength: 3, maxlength: 200},
    bookedTickets: {type:Array, required:false, default:[]},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
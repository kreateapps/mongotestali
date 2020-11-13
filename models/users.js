var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
    phonenum:String,
    password:String,
})


module.exports = mongoose.model('users',userSchema)

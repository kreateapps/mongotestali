var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
    
    cartype: String,
   
})


module.exports = mongoose.model('type',userSchema)

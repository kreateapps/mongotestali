var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
    masterzone:String,
    FMZ: { type: String,unique: true }

})


module.exports = mongoose.model('FMZ',userSchema)

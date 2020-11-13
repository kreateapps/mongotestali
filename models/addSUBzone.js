var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
    masterzone:String,
    FMZ: String,
    subzone: { type: String,unique: true }

})


module.exports = mongoose.model('SUBzone',userSchema)

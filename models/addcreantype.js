var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
  
    creantype:String

})


module.exports = mongoose.model('creantypes',userSchema)

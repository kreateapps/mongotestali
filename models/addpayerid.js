var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
  
   idplayer:String

})


module.exports = mongoose.model('notfcation',userSchema)

var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
  
   havycarstype:String

})


module.exports = mongoose.model('havycarstypes',userSchema)

var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({

    linetype: { type: String,unique: true }

})


module.exports = mongoose.model('linetypes',userSchema)

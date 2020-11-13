var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 

const Schema = mongoose.Schema
const userSchema= new Schema({
id:String,
phone:String,
data12:{title:String}
})


module.exports = mongoose.model('reports',userSchema)

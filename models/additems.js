var mongoose = require('mongoose');
//يعرف اليوزر و الايميل 


const Schema = mongoose.Schema

const add = new Schema({
    phonenumofuser: String,
    carname: String,
    cbody: String,
    phonenum: Number,
    rating: Number,
    zonetabel: {
        masterzone: String,
        FMZ: String,
        subzone: String,
    },
    fromto: {
        tomainzone: String,
        TMZ: String,
        tosubzone: String
    },
    fromtime: String,
    totime: String,
    carditels: String,
    cartype: String,
    gender: String,
    age: String,
    status: Number,
    createdetaandtime: String,
    viewsconts: Number,
})


module.exports = mongoose.model('items', add)
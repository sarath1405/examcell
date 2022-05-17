const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    author : {
        type : String,
        reuired : true
    },
    locked : {
        type : Boolean,
        default : false
    },
    date : {
        type : Date,
        required : true
    },
    duration : {
        type : Number,
        required : true,
    }
})

const exams = mongoose.model('exams', examSchema);

module.exports = exams;
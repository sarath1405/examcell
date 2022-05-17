const mongoose = require('mongoose')

const timerSchema = new mongoose.Schema({
    exam : {
        type : String,
        required : true,
    },
    studentName : {
        type : String,
        required : true,
    },
    startTime : {
        type : Date,
    },
    endTime : {
        type : Date,
    }
})

const timer = mongoose.model('timer', timerSchema);
module.exports = timer;
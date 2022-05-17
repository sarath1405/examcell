const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    studentName : {
        type : String,
        required : true,
    },
    examName : {
        type : String,
        required : true,
    },
})

const history = mongoose.model('history', historySchema);
module.exports = history
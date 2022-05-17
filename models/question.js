const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true,
    },
    option1 : {
        type : String,
        required : true,
    }, 
    option2 : {
        type : String,
        required : true,
    }, 
    option3 : {
        type : String,
        required : true,
    }, 
    option4 : {
        type : String,
        required : true,
    },
    correct : {
        type : Number,
        required : true
    },
    exam : {
        type : String,
        required : true
    }
})

const question = mongoose.model('question', questionSchema);
module.exports = question
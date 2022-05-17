const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    }
})

const teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;
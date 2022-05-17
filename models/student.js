const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
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
        required : true
    }
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student;
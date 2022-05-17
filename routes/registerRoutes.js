const express = require('express')
const router = express.Router();
const student = require('../models/student')
const teacher = require('../models/teacher')
const bcrypt = require('bcrypt')

router.route('/student/register').post( async (req, res) => {

    const username = req.body.username;
    let uc = 0, lc = 0, num = 0;
    for(let i=0; i<username.length; i++) {
        if(username[i]>='A' && username[i]<='Z') uc = 1;
        if(username[i]>='a' && username[i]<='z') lc = 1;
        if(username[i]-'0'>=1 && username[i]-'0'<=9) num = 1;
    }

    if(uc === 0) {
       return res.json({
            status : 'error',
            message : 'username must have atleast one UpperCase letter!'
        })
    }
    if(lc == 0) {
       return res.json({
            status : 'error',
            message : 'username must have atleast one LowerCase letter!'
        })
    }
    if(num == 0) {
       return res.json({
            status : 'error',
            message : 'username must have atleast one number!'
        })
    }
    if(req.body.password.length < 6) {
       return res.json({
            status : 'error',
            message : 'password must be alteast 6 characters long!'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newStudent = {
        name : req.body.name,
        username : username,
        password : password
    }

    const data1 = await student.findOne({
        username : username
    })

    const data2 = await teacher.findOne({
        username : username
    })

    if(data1 || data2) {
        return res.json({
            status : 'error',
            message : 'username already exists!'
        })
    }

    const response = await student.create(newStudent);
    if(response) {
       return res.json({
            status : 'ok',
        })
    }
})

router.route('/teacher/register').post( async (req, res) => {

    const username = req.body.username;
    const key = req.body.key;

    if(key != process.env.SECRET_KEY) {
        return res.json({
            status : 'error',
            message : 'invalid security code!'
        })
    }

    let uc = 0, lc = 0, num = 0;
    for(let i=0; i<username.length; i++) {
        if(username[i]>='A' && username[i]<='Z') uc = 1;
        if(username[i]>='a' && username[i]<='z') lc = 1;
        if(username[i]-'0'>=1 && username[i]-'0'<=9) num = 1;
    }

    if(uc === 0) {
       return res.json({
            status : 'error',
            message : 'username must have atleast one UpperCase letter!'
        })
    }
    if(lc == 0) {
       return res.json({
            status : 'error',
            message : 'username must have atleast one LowerCase letter!'
        })
    }
    if(num == 0) {
       return res.json({
            status : 'error',
            message : 'username must have atleast one number!'
        })
    }
    if(req.body.password.length < 6) {
       return res.json({
            status : 'error',
            message : 'password must be alteast 6 characters long!'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newTeacher = {
        name : req.body.name,
        username : username,
        password : password
    }

    const data1 = await teacher.findOne({
        username : username
    })

    const data2 = await student.findOne({
        username : username
    })

    if(data1 || data2) {
        return res.json({
            status : 'error',
            message : 'username already exists!'
        })
    }

    const response = await teacher.create(newTeacher);
    if(response) {
       return res.json({
            status : 'ok',
        })
    }
})

module.exports = router
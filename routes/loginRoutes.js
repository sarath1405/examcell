const express = require('express');
const router = express.Router();
const student = require('../models/student')
const teacher = require('../models/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.route('/student/login').post( async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let uc = 0, lc = 0, num = 0;
    for(let i=0; i<username.length; i++) {
        if(username[i]>='A' && username[i]<='Z') uc = 1;
        if(username[i]>='a' && username[i]<='z') lc = 1;
        if(username[i]-'0'>=1 && username[i]-'0'<=9) num = 1;
    }

    if(uc === 0) {
       return res.json({
            status : 'error',
            message : 'username should have atleast one UpperCase letter!'
        })
    }
    if(lc == 0) {
       return res.json({
            status : 'error',
            message : 'username should have atleast one LowerCase letter!'
        })
    }
    if(num == 0) {
       return res.json({
            status : 'error',
            message : 'username should have atleast one number!'
        })
    }

    const data = await student.findOne({
        username : username
    })

    if(!data) {
        return res.json({
            status : 'error',
            message : 'incorrect username, please register!'
        })
    }

    const hashedPassword = await bcrypt.compare(password, data.password);
    const token = jwt.sign({
        name : data.name,
        username : data.username
    }, process.env.JWT_SECRET, {expiresIn : '10h'});

    if(hashedPassword) {
        return res.json({
            status : 'ok',
            student : token
        },)
    }
    else {
        return res.json({
            status : 'error',
            message : 'incorrect password'
        })
    }
})

router.route('/teacher/login').post( async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let uc = 0, lc = 0, num = 0;
    for(let i=0; i<username.length; i++) {
        if(username[i]>='A' && username[i]<='Z') uc = 1;
        if(username[i]>='a' && username[i]<='z') lc = 1;
        if(username[i]-'0'>=1 && username[i]-'0'<=9) num = 1;
    }

    if(uc === 0) {
       return res.json({
            status : 'error',
            message : 'username should have atleast one UpperCase letter!'
        })
    }
    if(lc == 0) {
       return res.json({
            status : 'error',
            message : 'username should have atleast one LowerCase letter!'
        })
    }
    if(num == 0) {
       return res.json({
            status : 'error',
            message : 'username should have atleast one number!'
        })
    }

    const data = await teacher.findOne({
        username : username
    })

    if(!data) {
        return res.json({
            status : 'error',
            message : 'incorrect username, please register!'
        })
    }

    const hashedPassword = await bcrypt.compare(password, data.password);
    const token = jwt.sign({
        name : data.name,
        username : data.username
    }, process.env.JWT_SECRET, {expiresIn:'10h'})

    if(hashedPassword) {
        return res.json({
            status : 'ok',
            teacher : token
        })
    }
    else {
        return res.json({
            status : 'error',
            message : 'incorrect password'
        })
    }
})

router.route('/student/auth').get(async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const username = decode.username
        const data = await student.findOne({
            username : username
        })
        if(data) {
            return res.json({
                status : 'ok',
            })
        }
        
    }catch(error) {
        return res.json({
            status : 'error'
        })
    }
})

router.route('/teacher/auth').get(async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const username = decode.username
        const data = await teacher.findOne({
            username : username
        })
        if(data) {
            return res.json({
                status : 'ok',
            })
        }
        
    }catch(error) {
        return res.json({
            status : 'error',
            message : 'authentication failed!'
        })
    }
})

module.exports = router;
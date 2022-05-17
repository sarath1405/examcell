const express = require('express')
const router = express.Router();
const history = require('../models/history')
const question = require('../models/question')
const results = require('../models/results')

router.route('/addHistory').post(async (req, res) => {
    const studentName = req.body.studentName;
    const examName = req.body.exam;

    const response1 = await history.create({
        studentName : studentName,
        examName : examName,
    })

    if(response1) {
        return res.json({
            status : 'ok',
        })
    }
    return res.json({
        status : 'error',
        message : 'database failed'
    })
})

router.route('/updateResult').post(async (req, res) => {
    const studentName = req.body.student;
    const examName = req.body.exam;
    const total = req.body.total;
    const correct = req.body.cor;
    const score = req.body.score;
    const attempted = req.body.attempted;

    const response1 = await results.create({
        student : studentName,
        exam : examName,
        total : total,
        correct : correct,
        attempted : attempted,
        score : score,
    })

    if(response1) {
        return res.json({
            status : 'ok',
        })
    }

    return res.json({
        status : 'error',
        message : 'error while updating the result!'
    })
})

router.route('/checkHistory').get(async (req, res) => {
    const studentName = req.headers['studentname'];
    const examName = req.headers['examname'];
    const response = await history.findOne({
        studentName : studentName,
        examName : examName
    })

    if(response) {
        return res.json({
            status : 'error',
            message : 'you have already submitted this exam',
        })
    }
    else {
        return res.json({
            status : 'ok',
        })
    }
})

router.route('/correct').get(async (req, res) => {
    const exam = req.headers['exam'];
    const response = await question.find({
        exam : exam
    })

    if(response) {
        let array = [];
        for(let i=0; i<response.length; i++) array.push(response[i].correct);
        return res.json({
            status : 'ok',
            data : array
        })
    }

    return res.json({
        status : 'error',
        message : 'failed to fetch correct results'
    })
})

router.route('/dashboard').get(async (req, res) => {
    const student = req.headers['student'];
    const response = await results.find({
        student : student
    })

    if(response) {
        return res.json({
            status : 'ok',
            data : response
        })
    }
    return res.json({
        status : 'error',
        message : 'error in database'
    })
})

router.route('/report').get(async (req, res) => {
    const exam = req.headers['exam'];
    const response = await results.find({
        exam : exam
    })

    if(response) {
        return res.json({
            status : 'ok',
            data : response
        })
    }
    return res.json({
        status : 'error',
        message : 'error in database'
    })
})

module.exports = router
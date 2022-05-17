const express = require('express');
const router = express.Router();
const exams = require('../models/exams')
const questions = require('../models/question')
const history = require('../models/history')
const timer = require('../models/timers')

router.route('/exams').get( async (req, res) => {
    const response = await exams.find({
        author : req.headers['username']
    });

    if(response.length > 0) {
        return  res.json({
            status : 'ok',
            exams : response,
        })
    }
    else {
        return res.json({
            status : 'none',
            message : 'no exams added!',
        })
    }
})

router.route('/examDetails').get(async (req, res) => {
    const response = await exams.findOne({
        name : req.headers['exam'],
    });

    if(response) {
        return res.json({
            status : 'ok',
            data : response.duration,
        })
    }
    return res.json({
        status : 'error',
        messge : 'error occured in database',
    })
})

router.route('/student/exams').get( async (req, res) => {

    const response = await exams.find({
        date : req.headers['examdate']
    });

    if(response) {
        return  res.json({
            status : 'ok',
            exams : response,
        })
    }
    else {
        return res.json({
            status : 'none',
            message : 'no exams added!',
        })
    }3
})

router.route('/student/exams1').get( async (req, res) => {
    const response = await exams.find({
        date : {$gt : req.headers['examdate']}
    });
    
    if(response) {
        return  res.json({
            status : 'ok',
            exams : response,
        })
    }
    else {
        return res.json({
            status : 'none',
            message : 'no exams added!',
        })
    }
})

router.route('/student/exams2').get( async (req, res) => {
    const response = await exams.find({
        date : {$lt : req.headers['examdate']}
    });
    
    if(response) {
        return  res.json({
            status : 'ok',
            exams : response,
        })
    }
    else {
        return res.json({
            status : 'none',
            message : 'no exams added!',
        })
    }
})

router.route('/addExam').post(async (req, res) => {
    const name = req.body.name;
    const author = req.body.username;
    const date = req.body.date;
    const duration = req.body.duration;

    const newExam = {
        name,
        author,
        date,
        duration
    } 
    
    for(let i=0; i<name.length; i++) {
        if(name[i]===' ') {
            return res.json({
                status : 'error',
                message : 'exam name should not contain spaces, use CamelCase instead!'
            })
        }
    }

    const exam = await exams.findOne({
        name : name
    }) 

    if(exam) {
        return res.json({
            status : 'error',
            message : `${name} already exists`
        })
    }

    const data = exams.create(newExam);
    if(data) {
        return res.json({
            status : 'ok',
        })
    }
    else {
        return res.json({
            status : 'error',
            message : 'error'
        })
    }
})

router.route('/deleteExam').delete(async (req, res) => {
    const response = await exams.deleteOne({
        name : req.headers['examname']
    })

    const response1 = await questions.deleteMany({
        exam : req.headers['examname']
    })

    const response2 = await history.deleteMany({
        examName : req.headers['examname']
    })

    const response3 = await timer.deleteMany({
        exam : req.headers['examname']
    })

    if(response.acknowledged && response1.acknowledged && response2.acknowledged && response3.acknowledged) {
        return res.json({
            status : 'ok'
        })
    }

    else {
        return res.json({
            status : 'error',
            message : 'unable to delete!'
        })
    }
})

router.route('/questions').get(async (req, res) => {
    const response = await questions.find({
        exam : req.headers['exam']
    })

    if(response.length > 0) {
        return res.json({
            status : 'ok',
            data : response
        })
    }
    else {
        return res.json({
            status : 'error',
            message : 'no questions found'
        })
    }

})

router.route('/addQuestion').post(async (req, res) => {
    const question = req.body.question;
    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const option3 = req.body.option3;
    const option4 = req.body.option4;
    const correct = req.body.correct;
    const exam = req.body.examname;

    if(correct<1 || correct>4) {
        return res.json({
            status : 'error',
            message : 'correct answer not selected!'
        })
    }

    const newQuestion = {
        question,
        option1,
        option2,
        option3,
        option4,
        correct,
        exam,
    }

    const data = await questions.create(newQuestion);
    if(data) {
        return res.json({
            status : 'ok'
        })
    } 
    else {
        return res.json({
            status : 'error',
            message : 'error'
        })
    }
})

router.route('/deleteQuestion').delete(async (req, res) => {
    const question = req.headers['question'];
    const response = await questions.deleteOne({
        question : question
    })

    if(response.acknowledged != true) {
         return res.json({
             status : 'error',
             message : 'delete failed!'
         })
    }
})


module.exports = router
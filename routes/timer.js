const express = require('express')
const router = express.Router();
const timer = require('../models/timers')

router.route('/addTimer').post(async (req, res) => {
    const exam = req.body.exam;
    const studentName = req.body.studentName;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const newRecord = {
        exam,
        studentName,
        startTime,
        endTime,
    }

    const response = await timer.create(newRecord);
    if(response) {
        return res.json({
            status : 'ok',
        })
    }

    return res.json({
        status : 'error',
        message : 'error occured in database'
    })
})

router.route('/endTime').get(async (req, res) => {
    const examName = req.headers['exam'];
    const studentName = req.headers['studentname'];

    const response = await timer.findOne({
        exam : examName,
        studentName : studentName,
    })

    if(response) {
        return res.json({
            status : 'ok',
            data : response.endTime,
        })
    }
    return res.json({
        status : 'error',
        message : 'error occured in database',
    })
})

module.exports = router
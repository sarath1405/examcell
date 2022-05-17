const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    exam : {
        type : String,
    },
    student : {
        type : String,
    },
    score : {
        type : Number,
    },
    total : {
        type : Number,
    },
    attempted : {
        type : Number,
    },
    correct : {
        type : Number,
    }
})

const results = mongoose.model('results', resultSchema);

module.exports = results;
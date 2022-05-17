const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(console.log('mongodb connected!'))
.catch("database connection failed!");

app.use('/', require('./routes/registerRoutes'))
app.use('/', require('./routes/loginRoutes'))
app.use('/', require('./routes/examRoute'))
app.use('/', require('./routes/timer'))
app.use('/', require('./routes/exam'))


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(port);
})
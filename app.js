const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');   
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const studentRoute = require('./routes/studentRoute.js');
const app = express();
require('dotenv').config();
//bodyparser
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:4200', 'https://master.dc6hua597n5ox.amplifyapp.com'],
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);

// app.listen(3000,()=>{
//     console.log('Express server listening on port 3000');
// });

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.hakyf.mongodb.net/lwb?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");
    });

module.exports.handler = serverless(app);
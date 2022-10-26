// require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');   
const userRoute = require('./routes/userRoute.js');
const studentRoute = require('./routes/studentRoute.js');
const topicRoute = require('./routes/topicRoute.js');
const app = express();

app.use(express.json({ limit: '50kb' }));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Cache-Control", "no-cache");
    next();
});

app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);
app.use('/api/topics', topicRoute);

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
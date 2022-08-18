const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const studentRoute = require('./routes/studentRoute.js');
const app = express();

//bodyparser
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:4200', 'https://master.dc6hua597n5ox.amplifyapp.com'],
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));
app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);

// app.listen(3000,()=>{
//     console.log('Express server listening on port 3000');
// });
module.exports.handler = serverless(app);
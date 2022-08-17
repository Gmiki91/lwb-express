import express from 'express';
import cors from 'cors';

import userRoute from './routes/userRoute.js';
const app = express();

//bodyparser
app.use(express.json()); 

const corsOptions = {
    origin: ['http://localhost:4200'],
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));
app.use('/api/users', userRoute);

app.listen(3000,()=>{
    console.log('Express server listening on port 3000');
});
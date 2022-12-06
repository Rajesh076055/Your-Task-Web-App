const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./utlils/error');

const {register, login,forgotpassword,resetpassword} = require('./controllers/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Error Handler 
app.use(errorHandler);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true
})
.then(() => console.log("Connection Successful"))
.catch((error) => console.log("Connection failed", error.message));

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.post('/register',register);
app.post('/login',login);
app.post('/forgotpassword',forgotpassword);
app.post('/resetpassword/:resetToken',resetpassword);
app.use('/exercises',exerciseRouter);
app.use('/private',require('./routes/private'));


app.listen(port,()=>
{
    console.log(`Server is running at port: ${port}`);
})
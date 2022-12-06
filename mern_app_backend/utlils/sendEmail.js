const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const ErrorResponse = require("./errorResponse");
const jwt = require('jsonwebtoken');
const Auth = require('../models/user_auth.model');
dotenv.config();

const transporter = nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
    }
})
const sendEmail = async (options,next) =>
{
   
    

    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to:options.to,
        subject:options.subject,
        html:options.text
    };
    try {
       await transporter.sendMail(mailOptions);

    } catch (error) {
       
         return next(new ErrorResponse(error.message,400));
    }
    
};

module.exports = sendEmail;
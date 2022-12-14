
const crypto = require('crypto');
const Auth = require('../models/user_auth.model');
const ErrorResponse = require('../utlils/errorResponse');
const sendEmail = require('../utlils/sendEmail');


const sendToken =  (user,statusCode,res) =>
{
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

exports.register = async (req,res,next) =>
{   
    const {username, email, password} = req.body;

    try {
        const user = await Auth.create({username, email, password});

       sendToken(user,201,res);
    } catch (error ) {
       next(error);
    }
 
};

exports.login = async (req,res,next)=>
{
    const {email, password} = req.body;
    console.log(req.body);
    if(!email || !password){
        return next(new ErrorResponse("Please Provide an email and password",400))
    }

    try {
        const user = await Auth.findOne({email}).select("+password");

        if(!user)
        {
            return next(new ErrorResponse("Invalid Credentials",401))
        }

        const isMatch =  await user.matchPasswords(password);

        if(!isMatch)
        {
            return next(new ErrorResponse("Invalid Credentials here",401))
        }

        sendToken(user,200,res);
        
    } catch (error) {
       res.status(500).json({
        success:false,
        error:error.message
       })
    }
}

exports.forgotpassword = async (req,res,next) =>
{
    const {email} = req.body;

    try {
        const user = await Auth.findOne({email});

        if(!user)
        {
            return next( new ErrorResponse("Email couldnot be sent",404))
        }

       

        const resetToken = user.getResetPasswordToken();
 
        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href = ${resetUrl} clicktracking = off>${resetUrl}</a>
        `

        try {
             sendEmail({
                to:user.email,
                subject:"Password Reset Request",
                text:message
            });


            res.status(200).json({
                success:true,
                data:"Email sent"
            })

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next( new ErrorResponse("Email couldnot be send",500));
        }
    } catch (error) {
        next(error);
    }
}

exports.resetpassword = async (req,res,next) =>
{
   const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest('hex');


   try {
    const user = await Auth.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if(!user)
    {
        return next(new ErrorResponse("Invalid Reset Token",400))
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
        success:true,
        data:"Password reset success"
    })
   } catch (error) {
    
   }
}



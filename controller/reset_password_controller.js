const User = require('../model/user');
const Token = require('../model/token');
const crypto = require('crypto');
const {resetPasswordNoti} = require('../config/nodemailer');
const bcrypt = require('bcrypt');

module.exports.create = async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                message: "User not found or user does not exist!!",
                success: false
            })
        }
        const newToken = crypto.randomBytes(20).toString('hex');
        const createToken = await Token.create({
            email: user.email,
            token: newToken,
            isValid: true
        })
        await resetPasswordNoti(user.username, user.email, newToken);
        return res.status(200).json({
            message: "check your mail!!",
            success: true,
            createToken
        })

    } catch (error) {
        console.log("error in creating the token", error)
    }
}

module.exports.updatePassword = async (req, res)=>{
    try {
        const {password, cpassword, token}= req.body;
        const getToken = await Token.findOne({
            token: token
        });
        if(!getToken){
            return res.status(400).json({
                message: "Token does not exist or not found!!",
                success: false
            })
        }
        if(getToken.isValid===false){
            return res.status(404).json({
                message: "Token hash been expired!!",
                success: false
            })
        }
        const user = await User.findOne({
            email: getToken.email
        })
        if(!user){
            return res.status(402).json({
                message:"user does not exist or not available!!",
                success: false
            })
        }
        if(password != cpassword){
            return res.status(403).json({
                message: "password does not matched!!",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        getToken.isValid = false;
        await user.save();
        await getToken.save();
        return res.status(200).json({
            message: "password has been updated!!",
            success: true
        })

    } catch (error) {
        console.log("error in updating the password!!", error)
    }
}

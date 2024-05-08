
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.create = async (req, res)=>{
    try {
        const {email, username, password} = req.body;
        if(!email || !username || !password){
            return res.status(400).json({
                message: "Kindly enter the required details!!",
                success: false
            })
        }
        const user = await User.findOne({
            email: email,
            username: username
        })
        if(user){
            return res.status(401).json({
                message:"email or username already registered!!",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            email: email
        })
        return res.status(200).json({
            message: "user Register Successfully!!",
            success: true,
            user: newUser
        })
    } catch (error) {
        console.log("Error in registering the user", error)
    }
}

module.exports.login = async (req, res)=>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({
                message: "Kindly enter the username and password!!",
                success: false
            })
        }
        const user = await User.findOne({
            username: username
        })
        if(!user|| !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({
                message: "Invalid username or password!!",
                success: false
            })
        }
        return res.status(200).json({
            message: "User Logged In successfully!!",
            success: true,
            data:{
                token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: '1h'})
            }
            
        })
    } catch (error) {
        console.log("Error in logged in the user", error);
    }
}
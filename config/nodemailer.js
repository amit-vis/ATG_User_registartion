const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth:{
        user: process.env.USER_EMAIL,
        pass: process.env.USER_KEY
    }
});

const sendMail = async (to, tamplate, subject)=>{
    try {
        const mailContent = await transporter.sendMail({
            from: `ATG-user-Registration <${process.env.USER_EMAIL}>`,
            to: to,
            subject: subject,
            html: tamplate
        })
        return mailContent
    } catch (error) {
        console.log("Error in sending the mail", error)
    }
}

module.exports.resetPasswordNoti = async (userName, userEmail, token)=>{
    try {
        const subject = 'Reset Password!!';
        const content = `<div>
        <p>Hello ${userName},</p>
            <p>Kindly use the below mentioned token for reset your password.
                <br/>
                token = <b>${token}.</b>
            .</p>
            <p>
            Regards,
            <br/>
            E-Learning</p>
        </div>`;
        const data = await sendMail(userEmail, content, subject);
        return { success: true, message: "Email sent successfully.", data: data };
    } catch (error) {
        return { success: false, message: "Failed to send email.", error: error.message };
    }
}
 
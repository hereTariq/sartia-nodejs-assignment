const nodemailer = require('nodemailer');
const { EMAIL_PASS, EMAIL_SEVICE, EMAIL_USER } = require('../constants/common');

async function sendEmail(email, subject, message) {
    const transporter = nodemailer.createTransport({
        service: EMAIL_SEVICE,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    return await transporter.sendMail({
        from: 'admin@myapp.com',
        to: email,
        subject,
        html: message,
    });
}
module.exports = sendEmail;

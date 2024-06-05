const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
const EMAIL_USER = process.env.EMAIL_USER || 'example@gmail.com'; // your sending email
const EMAIL_PASS = process.env.EMAIL_PASS || 'your_password'; // your sending email password
const EMAIL_SEVICE = process.env.EMAIL_SEVICE || 'gmail';
module.exports = {
    PORT,
    SECRET_KEY,
    EMAIL_PASS,
    EMAIL_USER,
    EMAIL_SEVICE,
};

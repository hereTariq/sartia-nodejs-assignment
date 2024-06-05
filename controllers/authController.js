const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const catchAsync = require('../middlewares/catchAsync');
const ErrorHandler = require('../utils/errorHandler');
const { SECRET_KEY } = require('../constants/common');
const sendEmail = require('../utils/sendEmail');

const register = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const [existingUser] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    if (existingUser.length > 0) {
        return next(new ErrorHandler(400, 'Email already in use.'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );
    res.status(201).json({
        success: true,
        user: {
            name,
            email,
            id: result.insertId,
        },
        message: 'User registered successfully',
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [
        email,
    ]);
    const user = users[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new ErrorHandler(400, 'Invalid Credentials'));
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '10h',
    });
    res.status(200).json({ success: true, token });
});

const forgotPassword = catchAsync(async (req, res, next) => {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [
        req.body.email,
    ]);
    const existUser = users[0];

    if (!existUser) {
        return next(new ErrorHandler(401, 'Account does not exist.'));
    }
    const token = crypto.randomBytes(32).toString('hex');
    const message = `<h3>To reset your password <a href="http://localhost:3000/auth/reset-password?userId=${existUser.id}&token=${token}">click here </a> </h3>`;

    const response = await sendEmail(req.body.email, 'Reset Password', message);

    if (response.messageId) {
        const expiryToken = new Date(Date.now() + 3600000);
        await db.query(
            'UPDATE users SET token = ?, expiryToken = ? WHERE id = ?',
            [token, expiryToken, existUser.id]
        );
    }
    res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email',
        email: `http://localhost:3000/auth/reset-password?userId=${existUser.id}&token=${token}`,
    });
});

const resetPassword = catchAsync(async (req, res, next) => {
    const { userId, token } = req.query;
    if (!userId || !token) {
        return next(
            new ErrorHandler(401, 'userId and token required as query string')
        );
    }
    const { newPassword } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [
        userId,
    ]);
    if (users.length === 0) {
        return next(new ErrorHandler(401, 'Invalid or expired token.'));
    }

    const user = users[0];
    if (user.token !== token || new Date(user.expiryToken) < new Date()) {
        return next(new ErrorHandler(401, 'Invalid or expired token.'));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
        'UPDATE users SET password = ?, token = NULL, expiryToken = NULL WHERE id = ?',
        [hashedPassword, userId]
    );

    res.status(200).json({ message: 'Password reset successful' });
});

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};

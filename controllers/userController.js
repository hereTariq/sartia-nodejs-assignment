const ErrorHandler = require('../utils/errorHandler');
const db = require('../config/db');
const catchAsync = require('../middlewares/catchAsync');

const updateProfile = catchAsync(async (req, res, next) => {
    const id = req.userId;
    const { name, profile } = req.body;

    const fields = [];
    const values = [];

    if (name) {
        fields.push('name = ?');
        values.push(name);
    }

    if (profile) {
        fields.push('profile = ?');
        values.push(profile);
    }

    if (fields.length === 0) {
        return next(new ErrorHandler(400, 'No fields to update'));
    }

    values.push(id);

    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

    await db.query(sql, values);

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
    });
});

module.exports = {
    updateProfile,
};

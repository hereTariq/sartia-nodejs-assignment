const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants/common');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('./catchAsync');

const verifyToken = catchAsync(async (req, res, next) => {
    const bearerToken = req.header('authorization');
    if (!bearerToken) {
        return next(new ErrorHandler(401, 'Access Denied!'));
    }
    const token = bearerToken.split(' ')[1];

    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.userId = decodedToken.id;
    req.email = decodedToken.email;
    next();
});
module.exports = verifyToken;

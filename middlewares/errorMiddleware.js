const ErrorHandler = require('../utils/errorHandler');

function errorMiddleware(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if (err.name === 'JsonWebTokenError') {
        const message = `Json web token is invalid, Try again `;
        err = new ErrorHandler(httpStatus.UNAUTHORIZED, message);
    }

    if (err.name === 'TokenExpiredError') {
        const message = `Json web token is Expired, Try again `;
        err = new ErrorHandler(httpStatus.UNAUTHORIZED, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}

module.exports = errorMiddleware;

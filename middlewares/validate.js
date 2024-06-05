const ErrorHandler = require('../utils/errorHandler');
const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details
            .map((detail) => detail.message)
            .join(', ');
        return next(new ErrorHandler(422, errorMessage));
    }
    return next();
};
module.exports = validate;

const Joi = require('joi');
const registerValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
const emailValidation = Joi.object({
    email: Joi.string().email().required(),
});
const passwordValidation = Joi.object({
    newPassword: Joi.string().min(6).required(),
});
const profileValidation = Joi.object({
    name: Joi.string(),
    profile: Joi.string(),
});
module.exports = {
    registerValidation,
    loginValidation,
    emailValidation,
    passwordValidation,
    profileValidation,
};

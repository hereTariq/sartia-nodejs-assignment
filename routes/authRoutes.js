const router = require('express').Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const {
    registerValidation,
    loginValidation,
    emailValidation,
    passwordValidation,
    profileValidation,
} = require('../utils/validation/authValidation');

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.get(
    '/forgot-password',
    validate(emailValidation),
    authController.forgotPassword
);
router.put(
    '/reset-password',
    validate(passwordValidation),
    authController.resetPassword
);

module.exports = router;

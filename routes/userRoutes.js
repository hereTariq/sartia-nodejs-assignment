const verifyToken = require('../middlewares/isAuth');
const validate = require('../middlewares/validate');
const { profileValidation } = require('../utils/validation/authValidation');
const { updateProfile } = require('../controllers/userController');

const router = require('express').Router();

router.patch(
    '/update-profile',
    verifyToken,
    validate(profileValidation),
    updateProfile
);

module.exports = router;

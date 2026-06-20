//these are only routes that for user authentication means user can go on that routes...


const express =require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth.controller');

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);
router.post('/logout',authcontroller.logout );
router.post('/forgot-password',authcontroller.forgotPassword );
router.post('/reset-password/:token', authcontroller.resetPassword );

router.get('/verify/:token', authcontroller.verifyEmail);

module.exports = router;

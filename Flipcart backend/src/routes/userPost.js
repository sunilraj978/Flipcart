const User = require('../model/user')
const express = require('express')
const router = express.Router();
const {signUp,Login,requireSignIn,validation} = require('../controller/auth')
const {check} = require('express-validator');
const {signOut}  = require('../controller/admin/auth')


//SignUp
router.post('/signUp',[
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .isEmail()
    .withMessage( 'valid email required'),
    check('password')
    .isLength({min:6})
    .withMessage('Required at least 6 characters')
],validation,signUp);

//SignIn
router.post('/Login',[
    check('email')
    .isEmail()
    .withMessage( 'valid email required'),
    check('password')
    .isLength({min:6})
    .withMessage('Required at least 6 characters')
],validation,Login)


//sign Out
router.post('/signOut',signOut)



module.exports = router;
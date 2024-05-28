const express = require('express')
const router = express.Router();

const {signUp,Login,requireSignIn,validation,signOut} = require('../../controller/admin/auth')
const {check}  = require('express-validator');
const { adminAuth } = require('../../middleWare/applyMiddleware');


//SignUp
router.post('/admin/signUp',[
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
router.post('/admin/Login',[
    check('email')
    .isEmail()
    .withMessage( 'valid email required'),
    check('password')
    .isLength({min:6})
    .withMessage('Required at least 6 characters')
],validation,Login)



//signout:
router.post('/admin/signOut',signOut)


module.exports = router;

const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleWare/applyMiddleware');
const { requireSignIn } = require('../controller/admin/auth');
const {addAddress,getAddress}  = require('../controller/address')


router.post('/user/address/create', requireSignIn, userAuth, addAddress);
router.post('/user/getaddress', requireSignIn, userAuth, getAddress);





module.exports = router;
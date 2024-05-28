const { userAuth, adminAuth } = require('../middleWare/applyMiddleware');
const { requireSignIn } = require('../controller/admin/auth');
const { addOrder, getOrders, getOrder } = require("../controller/order");
const { UpdateOrder,getCustomerOrders } = require('../controller/admin/order');
const router = require("express").Router();

router.post("/addOrder", requireSignIn, userAuth, addOrder);
router.post("/getOrders", requireSignIn, userAuth, getOrders);
router.post("/getOrder", requireSignIn, userAuth, getOrder);

router.post('/order/update',requireSignIn,adminAuth,UpdateOrder)

router.post('/customer/order',requireSignIn,adminAuth,getCustomerOrders)

module.exports = router;
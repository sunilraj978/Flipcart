
const Order = require('../../model/order')


exports.UpdateOrder = (req,res)=>{
    Order.updateOne(
        {
            _id:req.body.orderId, "orderStatus.type":req.body.type
        },
        {
            $set:{
                "orderStatus.$":[{date:new Date(),type:req.body.type,isCompleted:true}],
            }
        }
    )
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({err});
        }
        if(order){
           return res.status(200).json({order})
        }
    })
}

exports.getCustomerOrders = async (req, res) => {
    const orders = await Order.find({})
      .populate("items.productId", "name")
      .exec();
    res.status(200).json({ orders });
  };
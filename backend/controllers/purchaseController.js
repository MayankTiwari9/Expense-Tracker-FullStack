const Razorpay = require("razorpay");
const Order = require("../models/order");

exports.purchasePremium = async (req, res, next) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        return res.status(500).json({ message: "Razorpay order creation failed", error: err });
      }

        req.user.createOrder({ orderid: order.id, status: "PENDING" }).then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        })
       
      
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

exports.updateTransactionStatus =  (req, res, next) => {
  
  try {
    const { payment_id, order_id } = req.body;
    Order.findOne({ where: { orderid: order_id } }).then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      order.update({
        paymentid: payment_id,
        status: "SUCCESSFUL",
      })
      .then(() => {
        req.user.update({ispremiumuser: true}).then(() => {
          return res.status(202).json({success: true, message: "Transaction Successfull"})
        })
        .catch((err) => {
          throw new Error(err);
        })
      })
      .catch((err) => {
        throw new Error(err);
      })
    })
    .catch((err) => {
      throw new Error(err);
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

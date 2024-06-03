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

      try {
        await req.user.createOrder({ orderid: order.id, status: "PENDING" });
        return res.status(201).json({ order, key_id: rzp.key_id });
      } catch (err) {
        return res.status(500).json({ message: "Database operation failed", error: err });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

exports.updateTransactionStatus = async (req, res, next) => {
  const { payment_id, order_id, status } = req.body;

  try {
    const order = await Order.findOne({ where: { orderid: order_id } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updateOrderStatus = order.update({
      paymentid: payment_id,
      status: status === "SUCCESS" ? "SUCCESSFULL" : "FAILED",
    });

    const updateUserStatus = status === "SUCCESS"
      ? req.user.update({ ispremiumuser: true })
      : Promise.resolve();

    await Promise.all([updateOrderStatus, updateUserStatus]);

    return res.status(202).json({
      success: status === "SUCCESS",
      message: status === "SUCCESS" ? "Transaction Successful" : "Transaction Failed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

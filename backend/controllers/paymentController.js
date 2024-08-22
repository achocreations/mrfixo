// /backend/controllers/paymentController.js
const stripe = require('../utils/stripe');
const Payment = require('../models/Payment');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, serviceId } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: 'usd',
      metadata: { serviceId },
    });

    const payment = new Payment({
      userId: req.user.id,
      serviceId,
      amount,
      paymentIntentId: paymentIntent.id,
    });
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId, status } = req.body;
    const payment = await Payment.findOneAndUpdate(
      { paymentIntentId },
      { status },
      { new: true }
    );

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

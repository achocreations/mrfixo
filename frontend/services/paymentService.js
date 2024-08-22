// /frontend/services/paymentService.js
import api from './api';

export const createPaymentIntent = async (serviceId, amount) => {
  try {
    const response = await api.post('/payments/create-payment-intent', {
      serviceId,
      amount,
    });
    return response.data;
  } catch (error) {
    throw new Error('Payment initialization failed');
  }
};

export const updatePaymentStatus = async (paymentIntentId, status) => {
  try {
    const response = await api.post('/payments/update-payment-status', {
      paymentIntentId,
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update payment status');
  }
};

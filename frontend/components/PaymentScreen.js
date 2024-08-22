// /frontend/components/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { createPaymentIntent } from '../services/paymentService';
import { catchError } from '../utils/errorHandler';

const PaymentScreen = ({ serviceId, amount }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const handlePayment = catchError(async () => {
    setLoading(true);
    const { clientSecret } = await createPaymentIntent(serviceId, amount);

    const initSheet = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });

    if (initSheet.error) throw new Error(initSheet.error.message);

    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      alert(`Payment failed: ${error.message}`);
    } else {
      alert('Payment succeeded!');
    }

    setLoading(false);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Payment</Text>
      <Text style={styles.amount}>${amount}</Text>
      <Button
        title={loading ? 'Processing...' : 'Pay Now'}
        onPress={handlePayment}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  amount: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default PaymentScreen;

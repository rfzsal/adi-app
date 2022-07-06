import currency from 'currency.js';
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Text,
  Appbar,
  useTheme,
  Button,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { getPayments, getPaymentLink } from '../../utils/payments';
import OrderDetails from './components/OrderDetails';
import Payments from './components/Payments';
import PriceDetails from './components/PriceDetails';

const Checkout = ({ route, navigation }) => {
  const auth = useAuth();
  const { colors } = useTheme();
  const [payments, setPayments] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const { product } = route.params;

  const isLoaded = useRef(true);

  const discount = product.discount && product.price * (product.discount / 100);
  const totalPrice = discount ? product.price - discount : product.price;

  const handleCheckout = async () => {
    if (!auth.user || isPressed) return;

    setIsPressed(true);

    const { id, name, email } = auth.user;

    const item_details = discount
      ? [
          {
            id: product.id,
            price: currency(product.price, { precision: 0 }),
            quantity: 1,
            name: product.name,
            category: product.category,
            merchant_name: 'BigBoyz',
          },
          {
            id: `${product.id}-discount`,
            price: currency(-discount, { precision: 0 }),
            quantity: 1,
            name: `${product.name} - Discount`,
            merchant_name: 'BigBoyz',
          },
        ]
      : [
          {
            id: product.id,
            price: currency(product.price, { precision: 0 }),
            quantity: 1,
            name: product.name,
            category: product.category,
            merchant_name: 'BigBoyz',
          },
        ];

    const parameter = {
      transaction_details: {
        order_id: '',
        gross_amount: currency(totalPrice, { precision: 0 }),
      },
      item_details,
      customer_details: {
        first_name: name,
        email,
      },
      enabled_payments: [payments[selectedPayment].value],
    };

    const transaction = {
      product: {
        id: product.id,
        name: product.name,
        price: currency(product.price, { precision: 0 }),
        discount: product.discount,
        variant: product.variant,
        duration: product.duration,
        image: product.image,
      },
      user: {
        id,
        name,
        email,
      },
      payment: {
        name: payments[selectedPayment].name,
        link: '',
        status: 'Sedang Diproses',
        createdAt: 0,
        expiredAt: 0,
      },
    };

    const paymentLink = await getPaymentLink(parameter, transaction);

    if (paymentLink && !paymentLink.error && isLoaded.current) {
      setIsPressed(false);
      navigation.navigate('Midtrans', { paymentLink });
    }
  };

  useEffect(() => {
    const loadPayments = async () => {
      const paymentsData = await getPayments();

      if (paymentsData.error) {
        return navigation.goBack();
      }

      if (isLoaded.current) {
        setPayments(paymentsData);
      }
    };

    loadPayments();

    return () => {
      isLoaded.current = false;
    };
  }, [navigation]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Ringkasan Pembayaran" />
      </Appbar.Header>

      <ScrollView style={styles.mainContainer}>
        <Text style={styles.header}>Rincian Pesanan</Text>
        <OrderDetails product={product} />

        <Divider height={16} />
        <Divider line />
        <Divider height={16} />

        <PriceDetails product={product} />

        <Divider height={16} />
        <View style={{ backgroundColor: colors.surface }}>
          <Divider height={8} />
        </View>
        <Divider height={16} />

        <Text style={styles.header}>Pilih Metode Pembayaran</Text>
        {!payments && (
          <>
            <Divider height={4} />
            <ActivityIndicator />
          </>
        )}

        {payments && (
          <>
            <View style={styles.container}>
              <Payments.Container>
                {payments.map((payment, index) => {
                  if (index === selectedPayment) {
                    return (
                      <Payments.Button
                        disabled={isPressed}
                        onPress={() => setSelectedPayment(index)}
                        key={payment.value}
                        selected
                      >
                        {payment.name}
                      </Payments.Button>
                    );
                  }

                  return (
                    <Payments.Button
                      disabled={isPressed}
                      onPress={() => setSelectedPayment(index)}
                      key={payment.value}
                    >
                      {payment.name}
                    </Payments.Button>
                  );
                })}
              </Payments.Container>
            </View>
          </>
        )}
      </ScrollView>

      {payments && (
        <>
          <View style={[styles.bottomContainer]}>
            <View style={styles.totalPaymentContainer}>
              <Text style={styles.totalPayment}>Total Pembayaran</Text>

              <Text style={styles.totalPrice}>
                {currency(totalPrice, {
                  symbol: 'Rp ',
                  precision: 0,
                }).format()}
              </Text>
            </View>
          </View>
          <Button
            loading={isPressed}
            onPress={handleCheckout}
            style={styles.paymentButton}
            labelStyle={styles.paymentLabel}
            mode="contained"
          >
            LANJUTKAN PEMBAYARAN
          </Button>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 16 },
  header: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    paddingHorizontal: 16,
  },
  container: { paddingHorizontal: 16 },
  bottomContainer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.2,
    borderTopColor: Colors.grey300,
  },
  totalPaymentContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  totalPayment: { fontWeight: 'bold', letterSpacing: 0.4 },
  totalPrice: { fontSize: 22, fontWeight: 'bold', letterSpacing: 0.4 },
  paymentButton: { borderRadius: 0, position: 'relative', bottom: 0 },
  paymentLabel: { paddingVertical: 8 },
});

export default Checkout;

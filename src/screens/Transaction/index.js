import firestore from '@react-native-firebase/firestore';
import currency from 'currency.js';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import {
  Text,
  Appbar,
  useTheme,
  Button,
  TouchableRipple,
} from 'react-native-paper';

import Divider from '../../components/Divider';
import OrderDetails from './components/OrderDetails';
import PriceDetails from './components/PriceDetails';
import TransactionDetails from './components/TransactionDetails';

const Transaction = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const { transaction } = route.params;

  const product = transaction.product;
  const payment = transaction.payment;

  const discount = product.discount;
  const totalPrice = discount ? product.price - discount : product.price;

  const isExpired = paymentStatus === 'Transaksi Kadaluarsa';
  const isFailed = paymentStatus === 'Transaksi Gagal';
  const isPaid = paymentStatus === 'Transaksi Berhasil';
  const isPending = paymentStatus === 'Menunggu Pembayaran';
  const isCancel = paymentStatus === 'cancel';

  const cancelTransaction = async () => {
    try {
      await firestore().collection('transactions').doc(transaction.id).update({
        'payment.status': 'cancel',
      });
    } catch (error) {
      return { error };
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Batalkan pesanan?',
      'Apakah kamu yakin ingin membatalkan pesanan?',
      [{ text: 'Batalkan', onPress: cancelTransaction }, { text: 'Tidak' }]
    );
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('transactions')
      .doc(transaction.id)
      .onSnapshot((snapshot) => {
        setPaymentStatus(snapshot.data().payment.status);
      });

    return () => unsubscribe();
  }, [transaction.id]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Ringkasan Transaksi" />
      </Appbar.Header>

      <ScrollView>
        <View style={{ height: 16, backgroundColor: colors.primary }}>
          <View
            style={{
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              height: 16,
              backgroundColor: colors.notification,
            }}
          />
        </View>

        <View
          style={[
            styles.bannerContainer,
            { backgroundColor: colors.notification },
          ]}
        >
          <Text style={[styles.bannerTitle, { color: colors.background }]}>
            {paymentStatus === 'cancel'
              ? 'Transaksi Gagal'
              : paymentStatus || payment.status}
          </Text>

          {paymentStatus === 'Menunggu Pembayaran' && (
            <Text style={[styles.bannerSubtitle, { color: colors.background }]}>
              Harap melakukan pembayaran sebelum{' '}
              {format(payment.expiredAt, 'dd MMMM yyyy, HH:mm')}
            </Text>
          )}
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.header}>Rincian Pesanan</Text>
          <TransactionDetails transaction={transaction} />

          <Divider height={16} />
          <Divider line />
          <Divider height={16} />

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

          <Text style={styles.header}>Metode Pembayaran</Text>
          <Text style={styles.container}>{payment.name}</Text>

          <Divider height={16} />
          <View style={{ backgroundColor: colors.surface }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          {isPending && (
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <TouchableRipple onPress={handleCancel}>
                  <View style={styles.cancelButton}>
                    <Text
                      style={[styles.cancelButtonText, { color: colors.error }]}
                    >
                      BATALKAN PESANAN
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {isPending && (
        <>
          <View
            style={[
              styles.bottomContainer,
              { backgroundColor: colors.background },
            ]}
          >
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
            onPress={() =>
              navigation.navigate('Midtrans', { paymentLink: payment.link })
            }
            style={styles.paymentButton}
            labelStyle={styles.paymentLabel}
            mode="contained"
          >
            BAYAR SEKARANG
          </Button>
        </>
      )}

      {(isPaid || isFailed || isExpired || isCancel) && (
        <View
          style={[
            styles.bottomContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Button
            onPress={() => {
              navigation.push('Main', { screen: 'Profile' });
            }}
            style={styles.paymentButton}
            labelStyle={styles.paymentLabel}
            mode="contained"
          >
            Lihat Profil
          </Button>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bannerContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  mainContainer: { paddingVertical: 16 },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  bannerSubtitle: {
    marginTop: 4,
  },
  header: {
    marginBottom: 8,
    fontSize: 16,
    letterSpacing: 0.4,
    paddingHorizontal: 16,
    fontWeight: 'bold',
  },
  container: { paddingHorizontal: 16 },
  buttonContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  cancelButton: {
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    letterSpacing: 1,
  },
  bottomContainer: {
    position: 'relative',
    bottom: 0,
    elevation: 4,
    left: 0,
    right: 0,
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

export default Transaction;

import React from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, ActivityIndicator, useTheme } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useTransactions } from '../../hooks/useTransactions';
import RippleTransaction from './components/RippleTransaction';

const TransactionsHistory = ({ route, navigation }) => {
  const { colors } = useTheme();
  const auth = useAuth();
  const transactions = useTransactions();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Riwayat Transaksi" />
      </Appbar.Header>

      <ScrollView>
        <View style={{ height: 16, backgroundColor: colors.primary }}>
          <View
            style={{
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              height: 16,
              backgroundColor: colors.background,
            }}
          />
        </View>

        {!transactions && auth.user && (
          <>
            <Divider height={16} />
            <ActivityIndicator />
          </>
        )}

        {transactions &&
          transactions.map((transaction) => {
            const status =
              transaction.payment.status === 'cancel'
                ? 'Transaksi Gagal'
                : transaction.payment.status;

            return (
              <React.Fragment key={transaction.id}>
                <RippleTransaction
                  image={transaction.product.image || null}
                  name={transaction.product.name}
                  price={transaction.product.price}
                  discount={transaction.product.discount}
                  timestamp={transaction.payment.createdAt}
                  status={status}
                  onPress={() =>
                    navigation.navigate('Transaction', { transaction })
                  }
                />
                <Divider line />
              </React.Fragment>
            );
          })}
      </ScrollView>
    </>
  );
};

export default TransactionsHistory;

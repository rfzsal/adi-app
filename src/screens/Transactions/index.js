import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Appbar, Text, useTheme, ActivityIndicator } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useTransactions } from '../../hooks/useTransactions';
import RippleTransaction from './components/RippleTransaction';

const Transactions = ({ route, navigation }) => {
  const auth = useAuth();
  const transactions = useTransactions();
  const { colors } = useTheme();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={route.name} />
        {transactions && (
          <View style={styles.appbarMenuContainer}>
            <Text
              onPress={() => navigation.navigate('TransactionsHistory')}
              style={[styles.appBarMenu, { color: colors.background }]}
            >
              Riwayat Transaksi
            </Text>
          </View>
        )}
      </Appbar.Header>

      <ScrollView>
        {!transactions && auth.user && (
          <>
            <Divider height={16} />
            <ActivityIndicator />
          </>
        )}

        {transactions &&
          transactions.map((transaction) => {
            if (transaction.payment.status !== 'Menunggu Pembayaran') {
              return null;
            }

            return (
              <React.Fragment key={transaction.id}>
                <RippleTransaction
                  image={transaction.product.image || null}
                  name={transaction.product.name}
                  price={transaction.product.price}
                  discount={transaction.product.discount}
                  timestamp={transaction.payment.createdAt}
                  status={transaction.payment.status}
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

const styles = StyleSheet.create({
  appbarMenuContainer: { paddingRight: 12 },
  appBarMenu: { paddingVertical: 4 },
});

export default Transactions;

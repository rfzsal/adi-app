import React from 'react';
import { ScrollView } from 'react-native';
import { Appbar, ActivityIndicator } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useTransactions } from '../../hooks/useTransactions';
import RippleTransaction from './components/RippleTransaction';

const TransactionsHistory = ({ route, navigation }) => {
  const auth = useAuth();
  const transactions = useTransactions();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={route.name} />
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
            return (
              <React.Fragment key={transaction.id}>
                <RippleTransaction
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

export default TransactionsHistory;

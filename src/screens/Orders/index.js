import { ScrollView, StyleSheet } from 'react-native';
import { Text, Appbar } from 'react-native-paper';

const Orders = ({ route }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={route.name} />
      </Appbar.Header>

      <ScrollView style={styles.mainContainer}>
        <Text style={styles.centeredText}>{route.name}</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { padding: 16 },
  centeredText: { textAlign: 'center' },
});

export default Orders;

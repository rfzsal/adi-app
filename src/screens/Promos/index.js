import { useState, useEffect, useRef } from 'react';
import { RefreshControl } from 'react-native';
import { ActivityIndicator, useTheme, Appbar } from 'react-native-paper';
import { SectionGrid } from 'react-native-super-grid';

import Divider from '../../components/Divider';
import { getProducts } from '../../utils/products';
import ProductCard from './components/ProductCard';

const Promos = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(true);
  const [promos, setPromos] = useState(null);

  const isLoaded = useRef(true);

  const loadProducts = async () => {
    const productsData = await getProducts();

    if (isLoaded.current) {
      if (!productsData.error && productsData.length > 0) {
        const promosData = productsData.filter(
          (product) =>
            product.discounts[0] > 0 ||
            product.discounts[1] > 0 ||
            product.discounts[2] > 0
        );

        setPromos([{ index: 0, title: 'Sedang Promo', data: promosData }]);
      }

      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (refreshing) {
      loadProducts();
    }
  }, [refreshing]);

  useEffect(() => {
    return () => {
      isLoaded.current = false;
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ProductCard
        product={item}
        onPress={() =>
          navigation.navigate('Product', {
            productId: item.id,
            productName: item.name,
            productPrice: item.prices[0],
            productDiscount: item.discounts[0],
          })
        }
      />
    );
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Sedang Promo" />
      </Appbar.Header>

      {!promos && (
        <>
          <Divider height={16} />
          <ActivityIndicator />
        </>
      )}

      {promos && (
        <SectionGrid
          itemDimension={160}
          spacing={16}
          sections={promos}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        />
      )}
    </>
  );
};

export default Promos;

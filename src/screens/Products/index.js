import { useState, useEffect, useRef } from 'react';
import { RefreshControl } from 'react-native';
import { ActivityIndicator, useTheme, Appbar } from 'react-native-paper';
import { SectionGrid } from 'react-native-super-grid';

import Divider from '../../components/Divider';
import { getProducts } from '../../utils/products';
import ProductCard from './components/ProductCard';

const Products = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(true);
  const [products, setProducts] = useState(null);

  const isLoaded = useRef(true);

  const loadProducts = async () => {
    const productsData = await getProducts();

    if (isLoaded.current) {
      if (!productsData.error && productsData.length > 0) {
        setProducts([{ index: 0, title: 'Semua Layanan', data: productsData }]);
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
        <Appbar.Content title="Semua Layanan" />
      </Appbar.Header>

      {!products && (
        <>
          <Divider height={16} />
          <ActivityIndicator />
        </>
      )}

      {products && (
        <SectionGrid
          itemDimension={160}
          spacing={16}
          sections={products}
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

export default Products;

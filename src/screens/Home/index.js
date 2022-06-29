import { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionGrid } from 'react-native-super-grid';

import Divider from '../../components/Divider';
import { getProducts } from '../../utils/products';
import HorizontalProducts from './components/HorizontalProducts';
import ProductCard from './components/ProductCard';
import SectionHeader from './components/SectionHeader';

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(true);
  const [products, setProducts] = useState(null);

  const promos =
    products &&
    products[0]?.data.filter((product) => product.discounts.length > 1);

  const loadProducts = async () => {
    const productsData = await getProducts();

    if (!productsData.error && productsData.length > 0) {
      setProducts([{ index: 0, title: 'Layanan kami', data: productsData }]);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    if (refreshing) {
      loadProducts();
    }
  }, [refreshing]);

  const renderSectionHeader = ({ section }) => {
    return (
      <>
        {section.index === 0 && promos && (
          <>
            <Divider height={16} />

            <SectionHeader
              title="Lagi promo nih"
              onPress={() => navigation.navigate('Dummy')}
            />
            <HorizontalProducts products={promos} />
          </>
        )}

        {section.index === 0 && promos && <Divider height={24} />}

        <SectionHeader
          title={section.title}
          onPress={() => navigation.navigate('Dummy')}
        />
      </>
    );
  };

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
    <SafeAreaView>
      {!products && <ActivityIndicator />}

      {products && (
        <SectionGrid
          itemDimension={160}
          spacing={16}
          sections={products}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

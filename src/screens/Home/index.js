import 'react-native-gesture-handler';
import { useState, useEffect, useRef } from 'react';
import {
  RefreshControl,
  Image,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import { ActivityIndicator, useTheme, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
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

  const WINDOW_WIDTH = Dimensions.get('window').width;
  const isLoaded = useRef(true);

  const promos =
    products &&
    products[0]?.data.filter(
      (product) =>
        product.discounts[0] > 0 ||
        product.discounts[1] > 0 ||
        product.discounts[2] > 0
    );

  const loadProducts = async () => {
    const productsData = await getProducts(6);

    if (isLoaded.current) {
      if (!productsData.error && productsData.length > 0) {
        setProducts([{ index: 0, title: 'Layanan kami', data: productsData }]);
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

  const renderSectionHeader = ({ section }) => {
    return (
      <>
        {section.index === 0 && promos && (
          <Carousel
            autoPlay
            autoPlayInterval={5000}
            pagingEnabled
            width={WINDOW_WIDTH}
            height={160}
            data={promos}
            renderItem={({ index }) => (
              <View
                onTouchEnd={() =>
                  navigation.navigate('Product', {
                    productId: promos[index].id,
                    productName: promos[index].name,
                    productPrice: promos[index].prices[0],
                    productDiscount: promos[index].discounts[0],
                  })
                }
                style={styles.carouselImageContainer}
              >
                <View>
                  <Image
                    style={styles.carouselImage}
                    source={{ uri: promos[index].image }}
                  />
                  <View
                    style={[
                      styles.carouselOverlay,
                      {
                        backgroundColor: colors.backdrop,
                      },
                    ]}
                  />
                  <View style={styles.carouselTextContainer}>
                    <View
                      style={[
                        styles.carouselTextBg,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <Text style={styles.carouselTitleText}>
                        Layanan {promos[index].name}
                      </Text>
                      <Text style={styles.carouselDiscountText}>
                        🎉 Diskon {promos[index].discounts[0]}% 🎉
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}

        {section.index === 0 && promos && (
          <>
            <Divider height={16} />

            <SectionHeader
              title="Lagi promo nih"
              onPress={() => navigation.navigate('Promos')}
            />
            <HorizontalProducts products={promos} />
          </>
        )}

        {section.index === 0 && promos && <Divider height={24} />}

        <SectionHeader
          title={section.title}
          onPress={() => navigation.navigate('Products')}
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

const styles = StyleSheet.create({
  carouselImageContainer: { flex: 1 },
  carouselImage: { height: 160 },
  carouselOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.24,
  },
  carouselTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselTextBg: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  carouselTitleText: { letterSpacing: 0.4, textAlign: 'center' },
  carouselDiscountText: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.4,
  },
});

export default Home;

import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Image, View, StyleSheet } from 'react-native';
import {
  Text,
  useTheme,
  Button,
  IconButton,
  Colors,
  ActivityIndicator,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Divider from '../../components/Divider';
import { getProduct } from '../../utils/products';
import PriceDetails from './components/PriceDetails';
import ProductDetails from './components/ProductDetails';
import Variant from './components/Variant';

const Product = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { productId, productName, productPrice, productDiscount } =
    route.params;

  const isLoaded = useRef(true);

  const dummyImage = (name) =>
    `https://avatars.dicebear.com/api/initials/${name}.png?b=%23${
      colors.placeholder.split('#')[1]
    }`;

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await getProduct(productId);

      if (!productData || productData.error) {
        return navigation.goBack();
      }

      if (isLoaded.current) {
        setProduct(productData);
      }
    };

    loadProduct();

    return () => {
      isLoaded.current = false;
    };
  }, [productId, navigation]);

  useEffect(() => {
    setDiscount(productDiscount);
    setPrice(productPrice);
  }, [productPrice, productDiscount]);

  useEffect(() => {
    if (product) {
      setDiscount(product.discounts[selectedVariant]);
      setPrice(product.prices[selectedVariant]);
    }
  }, [product, selectedVariant]);

  return (
    <>
      <ScrollView>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: product
                ? product.image || dummyImage(product.name)
                : dummyImage(productName),
            }}
            onLoadEnd={() => setImageLoaded(true)}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.16)']}
            style={styles.imageGradient}
          />
          {!imageLoaded && (
            <View
              style={[
                styles.imagePlaceholder,
                {
                  backgroundColor: colors.placeholder,
                },
              ]}
            >
              <Text style={{ color: colors.placeholderText }}>
                {productName}
              </Text>
            </View>
          )}
        </View>

        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          {!product && (
            <>
              <Text numberOfLines={2} style={styles.title}>
                {productName}
              </Text>

              <Divider height={8} />
              <PriceDetails price={productPrice} discount={productDiscount} />

              <Divider height={32} />
              <ActivityIndicator />
            </>
          )}

          {product && (
            <>
              <Text numberOfLines={2} style={styles.title}>
                {product.name}
              </Text>

              <Divider height={8} />
              <PriceDetails price={price} discount={discount} />

              {product.variants[1] && (
                <>
                  <Divider height={24} />
                  <Variant.Container>
                    {product.variants.map((productVariant, index) => {
                      if (index === selectedVariant) {
                        return (
                          <Variant.Button
                            onPress={() => setSelectedVariant(index)}
                            key={selectedVariant}
                            selected
                          >
                            {productVariant}
                          </Variant.Button>
                        );
                      }

                      return (
                        <Variant.Button
                          onPress={() => setSelectedVariant(index)}
                          key={selectedVariant}
                        >
                          {productVariant}
                        </Variant.Button>
                      );
                    })}
                  </Variant.Container>
                </>
              )}

              <Divider height={24} />
              <ProductDetails>
                {product.descriptions[selectedVariant]}
              </ProductDetails>
            </>
          )}
        </View>
      </ScrollView>

      <SafeAreaView style={styles.goBackButton}>
        <IconButton
          icon="arrow-left"
          color={Colors.white}
          style={{ backgroundColor: colors.backdrop }}
          size={24}
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      {product && (
        <Button
          onPress={() =>
            navigation.navigate('Checkout', {
              product: {
                ...product,
                id: productId,
                price,
                discount:
                  discount > 0 ? product.discounts[selectedVariant] : null,
                variant:
                  product.variants.length > 1
                    ? product.variants[selectedVariant]
                    : null,
                duration: product.durations[selectedVariant],
              },
            })
          }
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
        >
          PESAN SEKARANG
        </Button>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
  },
  image: { height: 240 },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    bottom: 16,
  },
  title: { fontSize: 24, letterSpacing: 0.4 },
  button: {
    borderRadius: 0,
    position: 'relative',
    bottom: 0,
    width: '100%',
  },
  buttonLabel: { paddingVertical: 8 },
  goBackButton: {
    top: 0,
    left: 0,
    position: 'absolute',
    marginTop: 8,
    marginLeft: 8,
  },
});

export default Product;

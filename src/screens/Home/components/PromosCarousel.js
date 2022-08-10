import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import { useState } from 'react';
import { Image, Dimensions, View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

const PromosCarousel = ({ promos, onPress }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const WINDOW_WIDTH = Dimensions.get('window').width;

  return (
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
              onLoadEnd={() => setImageLoaded(true)}
            />
            <View
              style={[
                styles.carouselOverlay,
                {
                  backgroundColor: colors.backdrop,
                },
              ]}
            />
            {!imageLoaded && (
              <View
                style={[
                  styles.carouselPlaceholder,
                  {
                    backgroundColor: colors.placeholder,
                  },
                ]}
              />
            )}
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
  carouselPlaceholder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

PromosCarousel.propTypes = {
  promos: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      discounts: propTypes.arrayOf(propTypes.number).isRequired,
      image: propTypes.string,
    })
  ).isRequired,
};

export default PromosCarousel;

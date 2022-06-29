import firestore from '@react-native-firebase/firestore';

export const getProducts = async () => {
  try {
    const data = await firestore().collection('products').limit(6).get();
    if (data.empty) return [];

    return data.docs.map((product) => {
      return {
        id: product.id,
        ...product.data(),
      };
    });
  } catch (error) {
    return { error };
  }
};

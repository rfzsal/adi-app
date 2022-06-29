import firestore from '@react-native-firebase/firestore';

export const getProduct = async (id) => {
  try {
    const data = await firestore().collection('products').doc(id).get();

    return data.data();
  } catch (error) {
    return { error };
  }
};

export const getProducts = async (limit) => {
  try {
    const ref = firestore().collection('products');

    const data = limit ? await ref.limit(limit).get() : await ref.get();
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

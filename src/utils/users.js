import firestore from '@react-native-firebase/firestore';

export const saveUser = async (userId, userData) => {
  try {
    await firestore().collection('users').doc(userId).set(userData);

    return true;
  } catch (error) {
    return { error };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await firestore().collection('users').doc(userId).update(userData);

    return true;
  } catch (error) {
    return { error };
  }
};

export const addFCMToken = async (userId, FCMToken) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        FCMTokens: firestore.FieldValue.arrayUnion(FCMToken),
      });

    return true;
  } catch (error) {
    return { error };
  }
};

export const removeFCMToken = async (userId, FCMToken) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        FCMTokens: firestore.FieldValue.arrayRemove(FCMToken),
      });

    return true;
  } catch (error) {
    return { error };
  }
};

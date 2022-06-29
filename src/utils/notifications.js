import messaging from '@react-native-firebase/messaging';

export const getFCMToken = async () => {
  try {
    return await messaging().getToken();
  } catch (error) {
    return { error };
  }
};

export const deleteFCMToken = async () => {
  try {
    await messaging().deleteToken();

    return true;
  } catch (error) {
    return { error };
  }
};

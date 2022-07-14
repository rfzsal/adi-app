import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

import noMessages from '../../../assets/no-messages.png';
import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import RippleMessage from './components/RippleMessage';

const Messages = ({ navigation }) => {
  const auth = useAuth();
  const chatRooms = useMessages();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Pesan" />
      </Appbar.Header>

      {(!chatRooms || chatRooms?.length === 0) && (
        <View style={styles.vectorContainer}>
          <Image style={styles.vectorImage} source={noMessages} />

          <Text style={styles.vectorText}>Belum ada pesan saat ini</Text>
          <Button onPress={() => navigation.navigate('Home')} mode="contained">
            Konsultasi Sekarang
          </Button>
        </View>
      )}

      {chatRooms?.length > 0 && (
        <ScrollView>
          {chatRooms?.map((chatRoom, index) => {
            if (auth.user.role === 'admin') {
              if (chatRoom.expiredAt < Date.now()) {
                return null;
              }
            }

            return (
              <React.Fragment key={chatRoom.id}>
                <RippleMessage
                  avatar={chatRoom.image || null}
                  title={chatRoom.name}
                  subtitle={
                    auth.user.role === 'admin' ? chatRoom.users[1].name : null
                  }
                  text={chatRoom.latestMessage.text}
                  timestamp={chatRoom.latestMessage.timestamp}
                  counter={chatRoom.counter}
                  onPress={() =>
                    navigation.navigate('Message', {
                      chatRoom,
                    })
                  }
                />
                <Divider line />
              </React.Fragment>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  vectorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 48,
  },
  vectorImage: { height: 240, resizeMode: 'contain' },
  vectorText: { fontSize: 16, marginTop: 16, marginBottom: 24 },
});

export default Messages;

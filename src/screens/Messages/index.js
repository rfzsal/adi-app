import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar, ActivityIndicator } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import RippleMessage from './components/RippleMessage';

const Messages = ({ navigation, route }) => {
  const auth = useAuth();
  const chatRooms = useMessages();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Pesan" />
      </Appbar.Header>

      <ScrollView style={styles.mainContainer}>
        {!chatRooms && auth.user && (
          <>
            <Divider height={16} />
            <ActivityIndicator />
          </>
        )}

        {chatRooms &&
          chatRooms.map((chatRoom, index) => {
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
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 0 },
});

export default Messages;

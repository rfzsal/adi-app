import firestore from '@react-native-firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import {
  Appbar,
  Avatar,
  useTheme,
  IconButton,
  Colors,
} from 'react-native-paper';

import { useAuth } from '../../hooks/useAuth';
import Bubble from './components/Bubble';

const Message = ({ navigation, route }) => {
  const auth = useAuth();
  const { colors } = useTheme();
  const [title, setTitle] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [expiredAt, setExpiredAt] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [durationLeft, setDurationLeft] = useState(null);
  const { chatRoom } = route.params;

  const dummyAvatar = `https://avatars.dicebear.com/api/initials/${
    title || chatRoom.name
  }.png?b=%23${colors.notification.split('#')[1]}`;

  const isPending = expiredAt === 0;
  const isExpired = !isPending && expiredAt < Date.now();

  const sendMessage = async () => {
    try {
      const currentTimestamp = Date.now();

      firestore()
        .collection('messages')
        .doc(chatRoom.id)
        .collection('message')
        .doc()
        .set({
          sender: auth.user,
          text: newMessage,
          timestamp: currentTimestamp,
        });

      firestore()
        .collection('users')
        .doc(auth.user.id)
        .collection('chatRooms')
        .doc(chatRoom.id)
        .update({
          latestMessage: {
            sender: auth.user,
            text: newMessage,
            timestamp: currentTimestamp,
          },
        });

      firestore()
        .collection('notifications')
        .doc()
        .set({
          id: chatRoom.id,
          sender: auth.user,
          receiver: chatRoom.users[1].id,
          message: { text: newMessage, title, timestamp: currentTimestamp },
        });

      setNewMessage('');
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth.user.id)
      .collection('chatRooms')
      .doc(chatRoom.id)
      .onSnapshot((snapshot) => {
        if (!snapshot.exists) {
          navigation.goBack();
          return;
        }

        const data = snapshot.data();
        const _title = data.name;
        const _avatar = data.image;
        const _expiredAt = data.expiredAt;

        setTitle(_title);
        setAvatar(_avatar);
        setExpiredAt(_expiredAt);
      });

    return () => unsubscribe();
  }, [navigation, chatRoom.id, auth.user]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .doc(chatRoom.id)
      .collection('message')
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setMessages([]);
          return;
        }

        const rawMessages = snapshot.docs.map((data) => {
          return {
            id: data.id,
            ...data.data(),
          };
        });

        const _messages = rawMessages.sort((a, b) => a.timestamp - b.timestamp);

        setMessages(_messages);
      });

    return () => unsubscribe();
  }, [chatRoom.id]);

  useEffect(() => {
    const currentTimestamp = Date.now();

    if (expiredAt > 0 && expiredAt > currentTimestamp) {
      const unsubscribe = setTimeout(() => {
        setNewMessage('');
        setExpiredAt(expiredAt - 1);
      }, expiredAt - currentTimestamp);

      return () => clearTimeout(unsubscribe);
    }
  }, [expiredAt]);

  useEffect(() => {
    const currentTimestamp = Date.now();

    if (expiredAt > 0 && expiredAt > currentTimestamp) {
      setDurationLeft(formatDistanceToNow(expiredAt, { locale: id }));

      const unsubscribe = setInterval(() => {
        setDurationLeft(formatDistanceToNow(expiredAt, { locale: id }));
      }, 60 * 1000);

      return () => clearInterval(unsubscribe);
    }

    setDurationLeft(null);
  }, [expiredAt]);

  useEffect(() => {
    const clearCounter = async () => {
      firestore()
        .collection('users')
        .doc(auth.user.id)
        .collection('chatRooms')
        .doc(chatRoom.id)
        .update({
          counter: 0,
        });
    };

    return () => clearCounter();
  }, []);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Avatar.Image
          style={styles.appbarAvatar}
          size={42}
          source={{ uri: avatar || dummyAvatar }}
        />
        <Appbar.Content
          title={title || chatRoom.name}
          subtitle={durationLeft ? `Waktu tersisa ${durationLeft}` : null}
        />
      </Appbar.Header>

      <ScrollView
        style={[{ backgroundColor: colors.surface }, styles.messagesContainer]}
      >
        <View style={styles.messagesInnerContainer}>
          {messages &&
            messages.map((message) => {
              return (
                <View key={message.id}>
                  {message.sender === 'System' && (
                    <Bubble position="center">{message.text}</Bubble>
                  )}

                  {message.sender !== 'System' &&
                    message.sender.id === auth.user.id && (
                      <Bubble position="right">{message.text}</Bubble>
                    )}

                  {message.sender !== 'System' &&
                    message.sender.id !== auth.user.id && (
                      <Bubble position="left">{message.text}</Bubble>
                    )}
                </View>
              );
            })}
        </View>
      </ScrollView>

      <View
        style={[
          styles.textInputContainer,
          {
            backgroundColor: colors.background,
            borderTopColor: Colors.grey300,
          },
        ]}
      >
        {expiredAt !== null && (
          <View style={{ flex: 1 }}>
            {isPending && (
              <TextInput
                editable={false}
                placeholder="Sesi konsultasi belum dimulai"
                style={styles.textInput}
                multiline
              />
            )}

            {!isPending && !isExpired && (
              <TextInput
                editable
                onChangeText={setNewMessage}
                value={newMessage}
                placeholder="Tanyakan sesuatu..."
                style={styles.textInput}
                multiline
              />
            )}

            {isExpired && (
              <TextInput
                editable={false}
                placeholder="Sesi konsultasi telah berakhir"
                style={styles.textInput}
                multiline
              />
            )}

            {newMessage !== '' && (
              <IconButton
                icon="send"
                color={colors.primary}
                size={24}
                style={styles.sendIcon}
                onPress={sendMessage}
              />
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  messagesContainer: { scaleY: -1, paddingHorizontal: 8 },
  messagesInnerContainer: { scaleY: -1, marginTop: 8 },
  appbarAvatar: { marginRight: -8, top: 1 },
  textInputContainer: {
    position: 'relative',
    paddingHorizontal: 16,
    maxHeight: 96,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.2,
  },
  textInput: { flex: 1 },
  sendIcon: { marginRight: -6 },
});

export default Message;

// /frontend/components/Chat.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { fetchMessages, sendMessage } from '../services/chatService';

const Chat = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchMessages(conversationId);
      setMessages(fetchedMessages);
    };
    loadMessages();
  }, [conversationId]);

  const handleSend = async () => {
    const newMessage = await sendMessage(conversationId, message);
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default Chat;

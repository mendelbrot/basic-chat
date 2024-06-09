import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ message }) => {
  const isUser = message.sender === 'user'; // Determine if it's the user's message

  return (
    <View style={[styles.message, isUser && styles.userMessage]}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignSelf: 'flex-start', // Messages from others on the left
  },
  userMessage: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end', // User's messages on the right
    color: 'white',
  },
  text: {
    fontSize: 16,
  },
});

export default Message;

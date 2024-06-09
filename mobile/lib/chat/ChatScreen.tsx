import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import MessageFeed from './MessageFeed';
import InputBar from './InputBar';
import api from '../api';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // Sample messages (from your API)
  const [inputMessageText, setInputMessageText] = useState('');

  const loadMessages = async () => {
    
  }

  const sendMessage = () => {
    // Handle sending the message via your API
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <MessageFeed messages={messages} />
      <InputBar 
        inputMessageText={inputMessageText}
        setInputMessageText={setInputMessageText}
        sendMessage={sendMessage}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ChatScreen;

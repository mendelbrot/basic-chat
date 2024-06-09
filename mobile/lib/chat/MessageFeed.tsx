import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Message from './Message';

const MessageFeed = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <Message message={item} />}
      keyExtractor={(item, index) => index.toString()}
      style={styles.feed}
      inverted // Display messages from bottom to top
    />
  );
};

const styles = StyleSheet.create({
  feed: { paddingHorizontal: 10 },
});

export default MessageFeed;

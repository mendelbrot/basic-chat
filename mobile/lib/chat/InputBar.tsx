import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const InputBar = ({ inputMessageText, setInputMessageText, sendMessage }) => {
  return (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.input}
        value={inputMessageText}
        onChangeText={setInputMessageText}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
});

export default InputBar;

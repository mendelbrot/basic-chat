import { StyleSheet, KeyboardAvoidingView } from "react-native";
import MessageFeed from "./MessageFeed";
import InputBar from "./InputBar";

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <MessageFeed />
      <InputBar />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, maxWidth: 500, height: "100%" },
});

export default ChatScreen;

import { StyleSheet, KeyboardAvoidingView } from "react-native";
import MessageFeed from "./MessageFeed";
import InputBar from "./InputBar";
import FeatureBar from "./FeatureBar";

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FeatureBar />
      <MessageFeed />
      <InputBar />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default ChatScreen;

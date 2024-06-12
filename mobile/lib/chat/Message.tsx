import { View, Text, StyleSheet } from "react-native";
import { Message as MessageType } from "../MainContext";

type Props = {
  message: MessageType;
};

const Message = ({ message }: Props) => {

  return (
    <View style={styles.message}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
  },
});

export default Message;

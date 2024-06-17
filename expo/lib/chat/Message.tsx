import { View, Text, StyleSheet } from "react-native";
import { Message as MessageType } from "@/lib/context/MainContext";
import theme from "@/lib/ui/theme";

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
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "slate",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: theme.fontSize,
  },
});

export default Message;

import { View, Text, StyleSheet } from "react-native";
import { Message as MessageType } from "@/lib/context/MainContext";
import theme from "@/lib/ui/theme";

type Props = {
  message: MessageType;
};

const Message = ({ message }: Props) => {

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
      <Text style={styles.text}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    alignSelf: "center",
    width: "95%",
  },
  inner: {
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "slate",
    alignSelf: "flex-start",
    maxWidth: "100%"
  },
  text: {
    fontSize: theme.fontSize,
  },
});

export default Message;

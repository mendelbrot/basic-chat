import { View, Text, StyleSheet } from "react-native";
import { Message as MessageType, useMain } from "@/lib/context/MainContext";
import theme from "@/lib/ui/theme";

const timeZone = "America/Los_Angeles";

type Props = {
  message: MessageType;
};

const formatTime = (timestamp: string, nowDateString: string): string => {
  const dateString = new Date(timestamp).toLocaleDateString("en-US", { timeZone });

  // same day
  if (dateString === nowDateString) {
    return new Date(timestamp).toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "numeric" });
  }

  // same year
  if (dateString.slice(-4) === nowDateString.slice(-4)) {
    return new Date(timestamp).toLocaleDateString("en-US", { timeZone, month: 'short', day: 'numeric'});
  }

  // different year
  return new Date(timestamp).toLocaleDateString("en-US", { timeZone, year:"numeric", month: 'short'});
};

const Message = ({ message }: Props) => {
  const state = useMain();
  const nowDateString = new Date().toLocaleDateString("en-US", { timeZone })

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.text}>{message.text}</Text>
        <View style={styles.messageInfo}>
          <Text style={{ marginRight: 32 }}>{state.usernameLookup[message.senderId]}</Text>
          <Text>{formatTime(message.createdAt, nowDateString)}</Text>
        </View>
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
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "slate",
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  text: {
    fontSize: theme.fontSize,
    padding: 8,
  },
  messageInfo: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: "slate",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Message;

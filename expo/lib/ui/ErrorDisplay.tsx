import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";

type Props = {
  dismissError: () => void;
  errorText: string;
};

const ErrorDisplay = (props: Props) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{props.errorText}</Text>
      <Pressable onPress={props.dismissError}>
        <Ionicons name="close" size={16} color="red" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginRight: 5,
  },
});

export default ErrorDisplay
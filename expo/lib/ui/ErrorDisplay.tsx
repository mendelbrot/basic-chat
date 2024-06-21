import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";
import theme from "@/lib/ui/theme";

type Props = {
  dismissError: () => void;
  errorText: string;
};

const ErrorDisplay = (props: Props) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{props.errorText}</Text>
      <Pressable onPress={props.dismissError}>
        <Ionicons name="close" size={16} color={theme.errorIconColor} />
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
    color: theme.errorColor,
    marginRight: 5,
  },
});

export default ErrorDisplay
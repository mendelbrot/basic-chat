import { View, Text, StyleSheet } from "react-native";
import {
  DraftMessage as DraftMessageType,
  useMainDispatch,
  mainDispatchers,
} from "@/lib/context/MainContext";
import ButtonSmall from "../ui/ButtonSmall";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/lib/ui/theme";

type Props = {
  draft: DraftMessageType;
  index: number;
};

const FailedMessage = ({ draft, index }: Props) => {
  const dispatch = useMainDispatch();

  const resendMessage = () => {
    mainDispatchers.resendFailedMessage(dispatch, draft, index);
  };
  const deleteDraft = () => {
    mainDispatchers.deleteFailedMessage(dispatch, index);
  };

  return (
    <View style={styles.inner}>
      <Text style={styles.text}>{draft.text}</Text>
      <View style={styles.options}>
        <ButtonSmall onPress={deleteDraft}>
          <Ionicons name="close" size={24} color="red" />
        </ButtonSmall>
        <ButtonSmall onPress={resendMessage}>
          <Ionicons name="arrow-redo-outline" size={24} color="red" />
        </ButtonSmall>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inner: {
    display: "flex",
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.errorColor,
    color: theme.errorColor,
    backgroundColor: theme.errorBackgroundColor,
    // @ts-ignore
    width: "fit-content",
    maxWidth: "92%",
  },
  text: {
    fontSize: theme.fontSize,
    padding: 8,
    color: theme.errorColor,
  },
  options: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: theme.errorColor,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FailedMessage;

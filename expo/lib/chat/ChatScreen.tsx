import { StyleSheet, KeyboardAvoidingView } from "react-native";
import MessageFeed from "./MessageFeed";
import InputBar from "./InputBar";
import FeatureBar from "@/lib/ui/FeatureBar";
import ButtonSmall from "../ui/ButtonSmall";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/lib/ui/theme";

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FeatureBar
        extraMenu={
          <ButtonSmall onPress={() => {}}>
            <Ionicons name="search-outline" size={24} color={theme.menuIconColor} />
          </ButtonSmall>
        }
      >
        <MessageFeed />
        <InputBar />
      </FeatureBar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor
  },
});

export default ChatScreen;

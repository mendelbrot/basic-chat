import {
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  View,
  Text,
} from "react-native";
import ButtonSmall from "../ui/ButtonSmall";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/lib/ui/theme";
import { useMain } from "@/lib/context/MainContext";
import Message from "./Message";
import { useState } from "react";
import RootView from "@/lib/ui/RootView";
import Input from "@/lib/ui/Input";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const MessageSearchModal = (props: Props) => {
  const state = useMain();
  const [searchText, setSearchText] = useState("");

  const searchMatches = state.messages.filter((message) =>
    message.text.includes(searchText)
  );

  const clearAndClose = () => {
    setSearchText("");
    props.setVisible(false);
  };

  return (
    <Modal visible={props.visible}>
      <RootView>
        <View style={styles.wrapper}>
          <View style={styles.inputRow}>
            <ButtonSmall onPress={clearAndClose}>
              <Ionicons name="close" size={24} color={theme.menuIconColor} />
            </ButtonSmall>
            <Input
              autoCapitalize="none"
              style={styles.input}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          {searchText.length >= 2 && searchMatches.length > 0 && (
            <ScrollView style={styles.scrollView}>
              {searchMatches.map((item, _index) => (
                <Message key={item.id} message={item} />
              ))}
            </ScrollView>
          )}
          {searchText.length >= 2 && searchMatches.length == 0 && (
            <Text style={styles.infoText}>No messages match this query.</Text>
          )}
          {searchText.length < 2 && (
            <Text style={styles.infoText}>
              Type at least two characters to search.
            </Text>
          )}
        </View>
      </RootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: theme.lightBorderColor,
    borderBottomWidth: 1,
    backgroundColor: theme.menuBackgroundColor,
  },
  input: {
    marginLeft: 16,
    flex: 1,
  },
  infoText: {
    fontSize: theme.fontSize,
    marginTop: 4,
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
});

export default MessageSearchModal;

import { StyleSheet, Modal, TextInput, ScrollView, View } from "react-native";
import ButtonSmall from "../ui/ButtonSmall";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/lib/ui/theme";
import { useMain } from "@/lib/context/MainContext";
import Message from "./Message";
import { useState } from "react";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const MessageSearchModal = (props: Props) => {
  const state = useMain();
  const [searchText, setSearchText] = useState("");

  const clearSearch = () => setSearchText("");

  const clearAndClose = () => {
    setSearchText("")
    props.setVisible(false)
  }

  return (
    <Modal visible={props.visible} style={styles.modal}>
      <View style={styles.inputRow}>
        <ButtonSmall
          onPress={clearAndClose}
          // disabled={searchText.length === 0}
        >
          <Ionicons name="close" size={24} color="black" />
        </ButtonSmall>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {searchText.length >= 3 && (
        <ScrollView style={styles.scrollView}>
          {state.messages
            .filter((message) => message.text.includes(searchText))
            .map((item, _index) => (
              <Message key={item.id} message={item} />
            ))}
        </ScrollView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    // flex: 1,
    backgroundColor: theme.backgroundColor,
    width: 300,
    height: 300,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "pink"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    fontSize: theme.fontSize,
    backgroundColor: theme.inputBackgroundColor,
  },
});

export default MessageSearchModal;

import { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { mainDispatchers, useMainDispatch } from "../MainContext";
import { useSession } from "@/lib/auth/AuthContext";

const InputBar = () => {
  const dispatch = useMainDispatch();
  const { session } = useSession();
  if (!session) {
    return null;
  }

  const [inputMessageText, setInputMessageText] = useState("");

  const send = () => {
    mainDispatchers.sendMessage(dispatch, session.token, {
      text: inputMessageText,
    });
  }

  return (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.input}
        value={inputMessageText}
        onChangeText={setInputMessageText}
      />
      <Pressable onPress={send}><Text>Send</Text></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
});

export default InputBar;

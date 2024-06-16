import { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import { mainDispatchers, useMainDispatch } from "@/lib/context/MainContext";
import { useAuth } from "@/lib/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const inputLineHeight = 24;
const inputPadding = 12;

const InputBar = () => {
  const dispatch = useMainDispatch();
  const { session } = useAuth();
  if (!session) {
    return null;
  }

  const [text, setText] = useState("");
  const [lines, setLines] = useState(1);

  const send = () => {
    mainDispatchers.sendMessage(dispatch, { text });
    setText("");
    setLines(1);
  };

  const onChangeSize = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    console.log(contentHeight)
    const contentLines = (contentHeight - 2*inputPadding) / inputLineHeight;
    setLines(Math.min(contentLines, 12));
  };

  return (
    <View style={styles.inputBar}>
      <TextInput
        multiline
        // @ts-ignore
        rows={lines}
        autoCapitalize="none"
        style={styles.input}
        value={text}
        onChangeText={setText}
        onContentSizeChange={onChangeSize}
      />
      <Pressable onPress={send}>
        <MaterialCommunityIcons name="send" size={24} color="black" />
      </Pressable>
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
    lineHeight: inputLineHeight,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: inputPadding,
    borderRadius: 5,
  },
});

export default InputBar;

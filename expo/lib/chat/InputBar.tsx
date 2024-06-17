import { useState } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import {
  mainDispatchers,
  useMain,
  useMainDispatch,
} from "@/lib/context/MainContext";
import { useAuth } from "@/lib/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ErrorDisplay from "@/lib/ui/ErrorDisplay";

const moreRows = 12;
const lessRows = 3;

const InputBar = () => {
  const dispatch = useMainDispatch();
  const { session } = useAuth();
  const { error } = useMain();
  if (!session) {
    return null;
  }

  const [text, setText] = useState("");
  const [rows, setRows] = useState(lessRows);

  const send = () => {
    mainDispatchers.sendMessage(dispatch, { text });
    setText("");
  };

  const clear = () => {
    setText("");
  };

  const toggleRows = () => {
    setRows(rows === lessRows ? moreRows : lessRows);
  };

  return (
    <View style={styles.inputBar}>
      {error && (
        <ErrorDisplay
          errorText={error}
          dismissError={() => mainDispatchers.dismissError(dispatch)}
        />
      )}
      <TextInput
        multiline
        // @ts-ignore
        rows={rows}
        autoCapitalize="none"
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <View style={styles.sendButtonRow}>
        <Pressable onPress={send}>
          <Ionicons name="send" size={24} color="black" />
        </Pressable>
        <Pressable onPress={toggleRows}>
          {rows === lessRows ? (
            <Ionicons name="chevron-expand" size={24} color="black" />
          ) : (
            <Ionicons name="chevron-collapse" size={24} color="black" />
          )}
        </Pressable>
        <Pressable onPress={clear}>
          <Ionicons name="close" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  sendButtonRow: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});

export default InputBar;

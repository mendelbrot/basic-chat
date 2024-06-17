import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  mainDispatchers,
  useMain,
  useMainDispatch,
} from "@/lib/context/MainContext";
import { useAuth } from "@/lib/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ErrorDisplay from "@/lib/ui/ErrorDisplay";
import ButtonSmall from "@/lib/ui/ButtonSmall";
import theme from "@/lib/ui/theme";

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
    <View style={styles.container}>
      {error && (
        <View style={styles.error}>
          <ErrorDisplay
            errorText={error}
            dismissError={() => mainDispatchers.dismissError(dispatch)}
          />
        </View>
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
        <ButtonSmall onPress={send} disabled={text.length === 0}>
          <Ionicons name="send" size={24} color="black" />
        </ButtonSmall>
        <ButtonSmall onPress={toggleRows}>
          {rows === lessRows ? (
            <Ionicons name="chevron-expand" size={24} color="black" />
          ) : (
            <Ionicons name="chevron-collapse" size={24} color="black" />
          )}
        </ButtonSmall>
        <ButtonSmall onPress={clear} disabled={text.length === 0}>
          <Ionicons name="close" size={24} color="black" />
        </ButtonSmall>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    fontSize: theme.fontSize,
  },
  sendButtonRow: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  error: {
    marginBottom: 4,
  }
});

export default InputBar;

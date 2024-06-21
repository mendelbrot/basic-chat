import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import theme from "@/lib/ui/theme";
import { Ref } from "react";

const Input = (props: TextInputProps & { ref?: Ref<TextInput> }) => {
  const { style, ...rest } = props;

  return <TextInput style={[styles.input, props.style]} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: theme.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: theme.fontSize,
    backgroundColor: theme.inputBackgroundColor,
  },
});

export default Input;

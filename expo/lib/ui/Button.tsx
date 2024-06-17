import { ReactNode } from "react";
import { StyleSheet, View, Pressable } from "react-native";

type Props = {
  children: ReactNode;
  onPress: () => void;
  styles?: Object;
};

export default function Button(props: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        props.styles,
        pressed && styles.pressed,
      ]}
      onPress={props.onPress}
    >
      <View style={styles.buttonContent}>{props.children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "slate",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});

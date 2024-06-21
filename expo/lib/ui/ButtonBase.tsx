import { ReactNode, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import theme from "@/lib/ui/theme";

export type ButtonBaseProps = {
  children: ReactNode;
  onPress: () => void;
  buttonStyles?: Object | Object[];
  buttonContentStyles?: Object;
  disabled?: boolean;
};

const ButtonBase = (props: ButtonBaseProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = Array.isArray(props.buttonStyles)
    ? props.buttonStyles.reduce(
        (merged, current) => ({ ...merged, ...current }),
        {}
      )
    : props.buttonStyles;

  const disabled = props.disabled === true ? true : false;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        buttonStyles,
        isHovered && styles.hovered,
        pressed && styles.pressed,
      ]}
      disabled={disabled}
      onPress={props.onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <View style={[styles.buttonContent, props.buttonContentStyles]}>
        {props.children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {},
  buttonContent: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  hovered: {},
  pressed: {
    opacity: 0.5,
  },
});

export default ButtonBase;

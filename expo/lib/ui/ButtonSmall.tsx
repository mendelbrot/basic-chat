import { StyleSheet } from "react-native";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

const ButtonSmall = (props: ButtonBaseProps) => {
  const { buttonStyles, ...rest } = props;

  return (
    <ButtonBase buttonStyles={[styles.buttonStyles, buttonStyles]} {...rest} />
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    width: 32,
    height: 32,
  },
});

export default ButtonSmall;

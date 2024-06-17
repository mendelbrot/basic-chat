import { StyleSheet } from "react-native";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

type Props = ButtonBaseProps & { type?: "success" | "danger" };

const Button = (props: Props) => {
  const { buttonStyles, type, ...rest } = props;

  const colorStyle =
    (type === "success" && { backgroundColor: "lightgreen" }) ||
    (type === "danger" && { backgroundColor: "coral" });

  return (
    <ButtonBase
      buttonStyles={[styles.buttonStyles, colorStyle, buttonStyles]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "slate",
    height: 48,
  },
});

export default Button;

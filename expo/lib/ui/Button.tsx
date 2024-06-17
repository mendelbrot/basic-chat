import { StyleSheet } from "react-native";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

type Props = ButtonBaseProps & { type?: "success" | "secondary" | "danger" };

const Button = (props: Props) => {
  const { buttonStyles, type, ...rest } = props;

  const colorStyle =
    (type === "success" && { backgroundColor: "lightgreen" }) ||
    (type === "secondary" && { backgroundColor: "lightskyblue" }) ||
    (type === "danger" && { backgroundColor: "lightpink" });

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

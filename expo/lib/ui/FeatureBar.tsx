import { ReactNode, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonSmall from "@/lib/ui/ButtonSmall";
import AppMenu from "@/lib/ui/AppMenu";
import theme from "@/lib/ui/theme";

type Props = {
  children: ReactNode;
  menu?: ReactNode;
  extraMenu?: ReactNode;
};
const FeatureBar = ({
  menu = <AppMenu />,
  extraMenu = null,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    isOpen && setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <ButtonSmall onPress={toggleIsOpen}>
          <Ionicons name="menu-outline" size={24} color={theme.menuIconColor} />
        </ButtonSmall>
        {extraMenu}
      </View>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.menuContainer,
            // @ts-ignore
            { visibility: isOpen ? "visible" : "hidden" },
          ]}
        >
          {menu}
        </View>
        <Pressable onPress={close} style={styles.contentWrapper}>{children}</Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.menuBackgroundColor
  },
  wrapper: {
    flex: 1,
    position: "relative"
  },
  menuContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
    elevation: 1,
  },
  contentWrapper: {
    flex: 1,
    // @ts-ignore
    cursor: 'default'
  },
});

export default FeatureBar;

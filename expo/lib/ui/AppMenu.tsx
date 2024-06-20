import { View, StyleSheet } from "react-native";
import { useAuth } from "@/lib/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonBase from "@/lib/ui/ButtonBase";
import theme from "@/lib/ui/theme";

const AppMenu = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <ButtonBase
        onPress={logout}
        buttonStyles={styles.button}
        buttonContentStyles={styles.buttonContent}
      >
        <Ionicons name="log-out-outline" size={24} color={theme.menuIconColor} />
      </ButtonBase>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: theme.menuBorderColor,
    backgroundColor: theme.menuBackgroundColor
  },
  buttonContent: {
    alignItems: "baseline",
    paddingLeft: 4,
  },
});

export default AppMenu;

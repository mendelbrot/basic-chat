import { View, StyleSheet } from "react-native";
import { useAuth } from "@/lib/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonBase from "@/lib/ui/ButtonBase";

const AppMenu = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <ButtonBase
        onPress={logout}
        buttonStyles={[styles.button, { borderTopWidth: 0 }]}
        buttonContentStyles={styles.buttonContent}
      >
        <Ionicons name="log-out-outline" size={24} color="black" />
      </ButtonBase>
      {/* <ButtonBase
        onPress={logout}
        buttonStyles={styles.button}
        buttonContentStyles={styles.buttonContent}
      >
        <Ionicons name="log-out-outline" size={24} color="black" />
      </ButtonBase> */}
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
    borderColor: "slate",
  },
  buttonContent: {
    alignItems: "baseline",
    paddingLeft: 4,
  },
});

export default AppMenu;

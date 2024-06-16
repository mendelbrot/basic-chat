import LoginForm from "@/lib/auth/LoginForm";
import { useAuth } from "@/lib/context/AuthContext";
import { Slot, Stack } from "expo-router";
import { Pressable, StyleSheet, View, Text } from "react-native";

export default function App() {
  const { session, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {session ? (
          <View>
            <View style={styles.appMenu}>
              <Pressable onPress={logout}>
                <Text>Logout</Text>
              </Pressable>
            </View>
            <Slot />
          </View>
        ) : (
          <LoginForm />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",

  },
  innerContainer: {
    backgroundColor: "#ddd",
    maxWidth: 800,
    margin: 'auto',
  },
  appMenu: {
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
});

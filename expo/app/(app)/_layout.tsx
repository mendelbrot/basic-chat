import LoginForm from "@/lib/auth/LoginForm";
import { useAuth } from "@/lib/context/AuthContext";
import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function App() {
  const { session } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.content}>{session ? <Slot /> : <LoginForm />}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
  },
  innerContainer: {
    // display: "flex",
    // justifyContent: "center",
  },
  content: {
    flex: 1,
    maxWidth: 580,
  },
});

import { useAuth } from "@/lib/context/AuthContext";
import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import ErrorDisplay from "@/lib/ui/ErrorDisplay";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/lib/ui/Button";
import theme from "@/lib/ui/theme";
import Input from "@/lib/ui/Input";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError, dismissLoginError } = useAuth();

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <Button onPress={handleLogin} type={"success"}>
          <Ionicons name="log-in-outline" size={36} color={theme.iconColor} />
        </Button>

        <View style={styles.error}>
          {loginError && (
            <ErrorDisplay
              errorText={loginError}
              dismissError={dismissLoginError}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.backgroundColor,
  },
  innerContainer: {
    padding: 32,
  },
  input: {
    height: 48,
    padding: 16,
    marginBottom: 16,
  },
  error: {
    marginTop: 16,
    height: 16,
  },
});

export default LoginForm;

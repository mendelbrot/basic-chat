import { useAuth } from "@/lib/context/AuthContext";
import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import ErrorDisplay from "@/lib/ui/ErrorDisplay";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/lib/ui/Button";
import theme from "@/lib/ui/theme";

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
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <Button onPress={handleLogin}>
          <Ionicons name="log-in-outline" size={36} color="black" />
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
  },
  innerContainer: {
    padding: 32,
  },
  input: {
    height: 48,
    borderColor: "slate",
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    fontSize: theme.fontSize,
  },
  error: {
    marginTop: 16,
    height: 16,
  },
});

export default LoginForm;

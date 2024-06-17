import { useAuth } from "@/lib/context/AuthContext";
import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import ErrorDisplay from "@/lib/ui/ErrorDisplay";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/lib/ui/Button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError, dismissLoginError } = useAuth();

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <View style={styles.container}>
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
      <Button onPress={handleLogin} styles={{ marginBottom: 16 }}>
        <Ionicons name="log-in-outline" size={36} color="black" />
      </Button>
      {loginError && (
        <ErrorDisplay errorText={loginError} dismissError={dismissLoginError} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  input: {
    height: 48,
    borderColor: "slate",
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
  },
});

export default LoginForm;

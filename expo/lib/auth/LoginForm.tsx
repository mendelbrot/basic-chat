import { useAuth } from "@/lib/context/AuthContext";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import ErrorDisplay from "@/lib/ErrorDisplay";
import { Ionicons } from "@expo/vector-icons";

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
      <Pressable onPress={handleLogin}>
        <Ionicons name="log-in-outline" size={24} color="black" />
      </Pressable>
      {loginError && (
        <ErrorDisplay errorText={loginError} dismissError={dismissLoginError} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginRight: 5,
  },
});

export default LoginForm;

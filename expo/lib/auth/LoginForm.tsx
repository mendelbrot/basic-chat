import { useAuth } from "@/lib/context/AuthContext";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

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
        <Text>Login</Text>
      </Pressable>
      {loginError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{loginError}</Text>
          <Pressable onPress={dismissLoginError}>
            <Entypo name="cross" size={16} color="red" />
          </Pressable>
        </View>
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
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginRight: 5,
  },
});

export default LoginForm;

import { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { mainDispatchers, useMainDispatch } from "@/lib/context/MainContext";
import { useAuth } from "@/lib/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const FeatureBar = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        // value={text}
        // onChangeText={setText}
      />
      <View style={styles.appMenu}>
        <Pressable onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  appMenu: {
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
});

export default FeatureBar;

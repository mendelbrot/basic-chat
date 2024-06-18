import { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { mainDispatchers, useMainDispatch } from "@/lib/context/MainContext";
import { useAuth } from "@/lib/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonSmall from "@/lib/ui/ButtonSmall";

const FeatureBar = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
        <ButtonSmall onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </ButtonSmall>
        <ButtonSmall onPress={() => {}}>
          <Ionicons name="search-outline" size={24} color="black" />
        </ButtonSmall>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
});

export default FeatureBar;

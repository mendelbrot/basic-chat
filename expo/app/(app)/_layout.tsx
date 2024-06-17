import { View, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import LoginForm from "@/lib/auth/LoginForm";
import { useAuth } from "@/lib/context/AuthContext";
import { Slot } from "expo-router";

export default function App() {
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const { session } = useAuth();

  /*
  the goal is for the content to fill the screen if the screen is narrower 
  than the specified with, and to be centered with exactly the specified
  width if the screen is wider.

  doing this with css only required a hack: using maxWidth for the content
  and a non-visible text element placed inside the content to prevent it 
  from collapsing.

  using the event listener instead does this better.
  */
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWidth(window.width);
    });
    return () => subscription.remove();
  }, []);

  const contentWidth = Math.min(512, width);

  return (
    <View style={styles.rootContainer}>
      <View style={{ width: contentWidth }}>
        {session ? <Slot /> : <LoginForm />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

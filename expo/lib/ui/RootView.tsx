import { View, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect, PropsWithChildren } from "react";
import theme from "@/lib/ui/theme";

const RootView = (props: PropsWithChildren) => {
  const [width, setWidth] = useState(Dimensions.get("window").width);

  /*
  the goal is for the content to fill the screen if the screen is narrower 
  than the specified with, and to be centered with exactly the specified
  width if the screen is wider.

  doing this with css only required a hack: using maxWidth for the content
  and a visibility hidden text element placed inside the content to prevent it 
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
    <View style={styles.root}>
      <View style={[styles.content, { width: contentWidth }]}>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.rootBackgroundColor
  },
  content: {
    flex: 1,
  },
});

export default RootView;

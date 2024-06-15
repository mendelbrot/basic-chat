import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Message from "./Message";
import {
  mainDispatchers,
  useMain,
  useMainDispatch,
} from "@/lib/context/MainContext";
import { useAuth } from "@/lib/context/AuthContext";

const MessageFeed = () => {
  const state = useMain();
  const dispatch = useMainDispatch();
  const { session } = useAuth();
  if (!session) {
    return null;
  }

  useEffect(() => {
    mainDispatchers.fetchEverything(dispatch);
  }, []);

  return (
    <FlatList
      data={state.messages}
      renderItem={({ item }) => <Message message={item} />}
      keyExtractor={(item, _index) => item.id.toString()}
      style={styles.feed}
    />
  );
};

const styles = StyleSheet.create({
  feed: { paddingHorizontal: 10 },
});

export default MessageFeed;

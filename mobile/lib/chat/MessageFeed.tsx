import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Message from "./Message";
import { mainDispatchers, useMain, useMainDispatch } from "../MainContext";
import { useSession } from "../auth/AuthContext";

const MessageFeed = () => {
  const state = useMain();
  const dispatch = useMainDispatch();
  const { session } = useSession();
  if (!session) {
    return null;
  }

  useEffect(() => {
    mainDispatchers.fetchEverything(dispatch, session.token);
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

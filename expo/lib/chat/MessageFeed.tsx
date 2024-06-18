import { useEffect, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
  const list = useRef<FlatList>(null);

  useEffect(() => {
    mainDispatchers.fetchEverything(dispatch);
  }, []);

  useEffect(() => {
    list.current?.scrollToEnd({animated: false})
    // state.messages.length > 0 &&
    //   list.current &&
    //   list.current.scrollToIndex({
    //     index: 3,
    //   });
  }, [state.messages]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={list}
        data={state.messages}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={(item, _index) => item.id.toString()}
        getItemLayout={(data, index) => (
          {length: 100, offset: 100 * index, index}
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    borderColor: "slate",
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default MessageFeed;

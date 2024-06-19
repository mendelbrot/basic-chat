import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Message from "./Message";
import FailedMessage from "./FailedMessage";
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
  const list = useRef<ScrollView>(null);

  useEffect(() => {
    mainDispatchers.fetchEverything(dispatch);
  }, []);

  useEffect(() => {
    list.current && list.current.scrollToEnd({ animated: false });
  }, [state.messages, state.failedMessages]);

  return (
    <View style={styles.container}>
      <ScrollView ref={list}>
        {state.messages.map((item, _index) => (
          <Message key={item.id} message={item} />
        ))}
        {state.failedMessages.map((item, index) => (
          <FailedMessage key={index} draft={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    borderColor: "slate",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    // borderRadius: 8,
    borderWidth: 1,
  },
});

export default MessageFeed;

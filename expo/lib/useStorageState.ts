import * as SecureStore from "expo-secure-store";
import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export const storage = {
  getItem: async <J extends JSONValue>(key: string): Promise<J | null> => {
    if (Platform.OS === "web") {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } else {
      const value = await SecureStore.getItemAsync(key);
      return value ? JSON.parse(value) : null;
    }
  },
  setItem: async <J extends JSONValue>(key: string, value: J | null) => {
    if (Platform.OS === "web") {
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      if (value == null) {
        await deleteItemAsync(key);
      } else {
        await setItemAsync(key, JSON.stringify(value));
      }
    }
  },
};

const useStorageState = <J extends JSONValue>(
  key: string
): [boolean, J | null, (storageState: J | null) => void] => {
  const [[isLoading, storageState], setState] = useState<[boolean, J | null]>([
    true,
    null,
  ]);

  useEffect(() => {
    const loadStorage = async () => {
      const storageState = await storage.getItem(key);
      setState([false, storageState as J | null]);
    };

    loadStorage();
  }, [key]);

  const setStorageState = useCallback(
    async (storageState: J | null) => {
      setState([false, storageState]);
      await storage.setItem(key, storageState);
    },
    [key]
  );

  return [isLoading, storageState, setStorageState];
};

export default useStorageState;

// https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81
// https://docs.expo.dev/router/reference/authentication/

import JSONValue from "@/types/json-value-type";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

const setStorageItem = async (key: string, value: JSONValue): Promise<void> => {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  }
};

const getStorageItem = async (key: string): Promise<JSONValue> => {
  let returnValue: JSONValue = null;

  if (Platform.OS === "web") {
    try {
      if (typeof window.localStorage !== "undefined") {
        const value = window.localStorage.getItem(key);
        if (typeof value === "string") {
          returnValue = JSON.parse(value);
        }
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    const value = await SecureStore.getItemAsync(key);
    if (typeof value === "string") {
      returnValue = JSON.parse(value);
    }
  }

  return returnValue;
};

const useStorageState = <J extends JSONValue>(
  key: string
): [boolean, J | null, (value: J | null) => void] => {
  const [[isLoading, value], setState] = React.useState<[boolean, J | null]>([
    true,
    null,
  ]);

  React.useEffect(() => {
    const loadStorage = async () => {
      const value = await getStorageItem(key);
      setState([false, value as J | null]);
    };

    loadStorage();
  }, [key]);

  const setValue = React.useCallback(
    (value: J | null): void => {
      setState([false, value]);
      setStorageItem(key, value);
    },
    [key]
  );

  return [isLoading, value, setValue];
};

export default useStorageState;

// https://docs.expo.dev/router/reference/authentication/

import { Slot } from "expo-router";
import { SessionProvider } from "@/lib/auth/AuthContext";
import MainProvider from "@/lib/MainContext";

export default function Root() {
  return (
    <SessionProvider>
      <MainProvider>
        <Slot />
      </MainProvider>
    </SessionProvider>
  );
}

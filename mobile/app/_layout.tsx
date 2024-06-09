import { Slot } from "expo-router";
import { SessionProvider } from "@/lib/auth/AuthContext";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

import { Slot } from "expo-router";
import AuthProvider from "@/lib/context/AuthContext";
import MainProvider from "@/lib/context/MainContext";
import SocketProvider from "@/lib/context/SocketContext";

export default function Root() {
  return (
    <AuthProvider>
      <MainProvider>
        <SocketProvider>
          <Slot />
        </SocketProvider>
      </MainProvider>
    </AuthProvider>
  );
}

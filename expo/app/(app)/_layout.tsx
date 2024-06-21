import LoginForm from "@/lib/auth/LoginForm";
import { useAuth } from "@/lib/context/AuthContext";
import { Slot } from "expo-router";
import RootView from "@/lib/ui/RootView";

export default function App() {
  const { session } = useAuth();

  return <RootView>{session ? <Slot /> : <LoginForm />}</RootView>;
}

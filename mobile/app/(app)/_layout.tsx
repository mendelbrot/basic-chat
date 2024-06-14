import LoginForm from "@/lib/auth/LoginForm";
import { useAuth } from "@/lib/context/AuthContext";
import { Stack } from "expo-router";

export default function App() {
  const { session } = useAuth();

  if (!session) {
    return <LoginForm />;
  }

  return <Stack />;
}

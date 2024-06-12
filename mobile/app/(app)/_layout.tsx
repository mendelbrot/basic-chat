import LoginForm from "@/lib/auth/LoginForm";
import { useSession } from "@/lib/auth/AuthContext";
import { Stack } from "expo-router";

export default function App() {
  const { session } = useSession();

  if (!session) {
    return <LoginForm />;
  }

  return <Stack />;
}

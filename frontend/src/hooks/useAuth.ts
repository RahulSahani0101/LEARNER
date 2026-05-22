import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginApi } from "../lib/api";
import { useAuthStore } from "../store/authStore";

/**
 * Handles login mutation and centralizes success/error messaging.
 */
export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      try {
        return await loginApi(payload.email, payload.password);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (auth) => {
      setAuth(auth);
      toast.success("Welcome back. Let us build your Java momentum.");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    },
  });
}

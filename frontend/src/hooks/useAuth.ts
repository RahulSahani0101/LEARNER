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
    mutationFn: async (payload: { email: string; password: string; rememberMe: boolean }) => ({
      auth: await loginApi(payload.email, payload.password),
      rememberMe: payload.rememberMe,
    }),
    onSuccess: ({ auth, rememberMe }) => {
      setAuth(auth, rememberMe);
      toast.success("Welcome back Rahul, your workspace is ready.");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    },
  });
}

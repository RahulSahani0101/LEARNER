import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { GradientMesh } from "../components/effects/GradientMesh";
import { useLogin } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";

/**
 * Login screen with premium hero and credential form.
 */
export function AuthPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useLogin();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="relative grid min-h-screen place-items-center bg-brand-bg0 p-4">
      <GradientMesh />
      <section className="grid w-full max-w-5xl gap-5 rounded-3xl border border-white/10 bg-brand-bg1/80 p-5 backdrop-blur-glass md:grid-cols-2 md:p-8">
        <article className="rounded-2xl bg-gradient-to-br from-brand-purple/30 via-brand-blue/20 to-transparent p-5">
          <h1 className="font-heading text-3xl font-semibold leading-tight text-brand-text">Code Today, Build Tomorrow.</h1>
          <p className="mt-3 text-sm text-brand-muted">
            Structured Java and Spring Boot learning for 0-2 year developers targeting 8-10 LPA backend roles in Noida/NCR.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-brand-muted">
            <li>Industry-style roadmap by hiring priority</li>
            <li>Gamified streak, XP, and interview drills</li>
            <li>Spring Boot APIs, DSA, SQL, and mock interviews</li>
          </ul>
        </article>

        <article className="glass-card rounded-2xl p-5">
          <h2 className="font-heading text-xl font-semibold">Welcome Back</h2>
          <p className="mt-1 text-sm text-brand-muted">Use demo credentials to explore full product flow.</p>

          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = String(formData.get("email") ?? "").trim();
              const password = String(formData.get("password") ?? "");
              login.mutate({ email, password }, { onSuccess: () => navigate("/dashboard") });
            }}
          >
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Email</span>
              <input name="email" type="email" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 focus:border-brand-cyan/70 focus:outline-none" defaultValue="demo@javadevmastery.com" aria-label="Email" />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Password</span>
              <input name="password" type="password" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 focus:border-brand-cyan/70 focus:outline-none" defaultValue="Password@123" aria-label="Password" />
            </label>

            <Button type="submit" className="w-full" disabled={login.isPending} aria-label="Login">
              {login.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </article>
      </section>
    </main>
  );
}

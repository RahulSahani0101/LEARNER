import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, KeyRound, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { GradientMesh } from "../components/effects/GradientMesh";
import { BrandSignature } from "../components/layout/BrandSignature";
import { useLogin } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";

const DEMO_EMAIL = "demo@javadevmastery.com";
const DEMO_PASSWORD = "Password@123";

/**
 * Premium authentication screen with remember-me and demo sign-in accelerators.
 */
export function AuthPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useLogin();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [rememberMe, setRememberMe] = useState(true);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const canSubmit = useMemo(() => email.includes("@") && password.length >= 8, [email, password]);

  return (
    <main className="relative grid min-h-screen place-items-center p-4 md:p-6">
      <GradientMesh />

      <section className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-brand-bg1/85 shadow-softPanel backdrop-blur-glass md:grid-cols-[1.1fr_0.9fr]">
        <article className="relative flex flex-col justify-between gap-6 border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-brand-blue/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
              CODESA Premium
            </p>
            <h1 className="mt-5 font-heading text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
              Welcome Rahul Sahani,
              <span className="block gradient-text">your high-performance learning console is ready.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-brand-muted">
              Structured Java + Spring Boot mastery with enterprise-level workflows, modern UI smoothness, and production-focused progress tracking.
            </p>
          </div>

          <ul className="grid gap-3 text-sm text-brand-muted md:grid-cols-2">
            <li className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <CheckCircle2 className="h-4 w-4 text-brand-blue" />
              API-first roadmap aligned to real hiring loops
            </li>
            <li className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <CheckCircle2 className="h-4 w-4 text-brand-blue" />
              Interview drills with retention-friendly analytics
            </li>
            <li className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <CheckCircle2 className="h-4 w-4 text-brand-blue" />
              Responsive UX tuned for desktop and mobile workflows
            </li>
            <li className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <CheckCircle2 className="h-4 w-4 text-brand-blue" />
              Session persistence, secure signout, and route protection
            </li>
          </ul>

          <BrandSignature className="text-left text-[11px]" />
        </article>

        <article className="p-6 md:p-10">
          <h2 className="font-heading text-2xl font-semibold text-brand-text">Sign in</h2>
          <p className="mt-1 text-sm text-brand-muted">Use the preset demo account to explore the full product flow.</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setEmail(DEMO_EMAIL);
                setPassword(DEMO_PASSWORD);
                setLocalError("");
              }}
              className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-brand-text transition hover:border-brand-blue/60"
            >
              Autofill Demo Login
            </button>
          </div>

          <form
            className="mt-5 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (!canSubmit) {
                setLocalError("Please enter a valid email and password.");
                return;
              }

              setLocalError("");
              login.mutate({ email, password, rememberMe }, { onSuccess: () => navigate("/dashboard") });
            }}
          >
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Email</span>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-brand-text focus:border-brand-cyan/70 focus:outline-none"
                  aria-label="Email"
                />
              </div>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Password</span>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-brand-text focus:border-brand-cyan/70 focus:outline-none"
                  aria-label="Password"
                />
              </div>
            </label>

            <label className="flex items-center justify-between gap-3 text-xs text-brand-muted">
              <span className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent"
                />
                Remember me
              </span>
              <span>Secure JWT session</span>
            </label>

            {localError ? <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">{localError}</p> : null}

            <Button type="submit" className="w-full" disabled={login.isPending || !canSubmit} aria-label="Login">
              {login.isPending ? "Signing in..." : "Sign In to Dashboard"}
            </Button>
          </form>
        </article>
      </section>
    </main>
  );
}

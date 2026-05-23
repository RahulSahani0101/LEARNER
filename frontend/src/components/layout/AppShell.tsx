import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { ParticleBackground } from "../effects/ParticleBackground";
import { BrandSignature } from "./BrandSignature";
import { RightRail } from "./RightRail";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * Main responsive application shell wrapping all authenticated pages.
 */
export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation();
  const immersiveLearningMode =
    location.pathname === "/dashboard" ||
    location.pathname === "/explore" ||
    location.pathname.startsWith("/course/");

  if (immersiveLearningMode) {
    return (
      <div className="min-h-screen bg-[#EFE6D6]">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="moving-orb absolute left-[-5rem] top-16 h-36 w-36 rounded-full bg-brand-purple/25 blur-3xl" />
        <div className="moving-orb moving-orb--slow absolute right-[-4rem] top-24 h-28 w-28 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="moving-orb moving-orb--pulse absolute bottom-12 left-1/3 h-24 w-24 rounded-full bg-brand-cyan/20 blur-2xl" />
      </div>
      <Sidebar />

      <div className="relative z-10 lg:pl-72">
        <Topbar />

        <main className="grid grid-cols-1 gap-4 px-3 pb-5 pt-2 sm:px-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6 lg:px-6">
          <section className="min-w-0 space-y-5">{children}</section>
          <section className="space-y-4 lg:block">
            <div className="hidden lg:block">
              <RightRail />
            </div>
          </section>
        </main>

        <footer className="px-4 pb-6 pt-1 lg:px-6">
          <BrandSignature className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" />
        </footer>
      </div>
    </div>
  );
}

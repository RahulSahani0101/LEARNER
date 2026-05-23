import type { PropsWithChildren } from "react";
import { ParticleBackground } from "../effects/ParticleBackground";
import { BrandSignature } from "./BrandSignature";
import { RightRail } from "./RightRail";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * Main responsive application shell wrapping all authenticated pages.
 */
export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="fintech-aurora fintech-aurora--left" />
        <div className="fintech-aurora fintech-aurora--right" />
        <div className="fintech-aurora fintech-aurora--bottom" />
        <div className="moving-orb absolute left-[-5rem] top-16 h-44 w-44 rounded-full bg-brand-purple/35 blur-3xl" />
        <div className="moving-orb moving-orb--slow absolute right-[-4rem] top-24 h-36 w-36 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="moving-orb moving-orb--pulse absolute bottom-12 left-1/3 h-28 w-28 rounded-full bg-brand-cyan/28 blur-2xl" />
      </div>

      <Sidebar />

      <div className="relative z-10 lg:pl-[304px]">
        <div className="mx-2 my-2 rounded-[2rem] border border-white/10 bg-black/25 backdrop-blur-xl lg:mx-4 lg:my-4">
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
    </div>
  );
}

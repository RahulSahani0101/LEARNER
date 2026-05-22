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

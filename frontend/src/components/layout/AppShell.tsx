import type { PropsWithChildren } from "react";
import { ParticleBackground } from "../effects/ParticleBackground";
import { RightRail } from "./RightRail";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * Main responsive application shell wrapping all authenticated pages.
 */
export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Sidebar />
      <div className="lg:pl-72">
        <Topbar />
        <main className="grid grid-cols-1 gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 lg:p-6">
          <section>{children}</section>
          <section className="hidden lg:block">
            <RightRail />
          </section>
        </main>
      </div>
    </div>
  );
}

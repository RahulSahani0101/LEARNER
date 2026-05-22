/**
 * Decorative gradient mesh for hero sections.
 */
export function GradientMesh() {
  return (
    <div
      className="absolute inset-0 -z-10 bg-hero-mesh opacity-90"
      style={{
        maskImage: "radial-gradient(circle at 50% 45%, black 35%, transparent 100%)",
      }}
      aria-hidden="true"
    />
  );
}

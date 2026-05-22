/**
 * Generic card skeleton for loading placeholder states.
 */
export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="skeleton h-5 w-1/2 rounded-md" />
      <div className="mt-3 skeleton h-3 w-full rounded-md" />
      <div className="mt-2 skeleton h-3 w-4/5 rounded-md" />
      <div className="mt-4 skeleton h-2 w-full rounded-full" />
    </div>
  );
}

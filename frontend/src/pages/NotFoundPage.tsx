import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";

/**
 * Fallback route for unknown paths.
 */
export function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center text-center">
      <article>
        <p className="text-sm text-brand-muted">404</p>
        <h1 className="font-heading text-3xl font-semibold">Page Not Found</h1>
        <p className="mt-2 text-brand-muted">The route does not exist in this build.</p>
        <Link to="/dashboard" aria-label="Go to dashboard">
          <Button className="mt-4">Back to Dashboard</Button>
        </Link>
      </article>
    </div>
  );
}

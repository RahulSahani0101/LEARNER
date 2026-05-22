import { Toaster } from "react-hot-toast";
import { AppRouter } from "./routes/AppRouter";

/**
 * Root application component.
 */
export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(11,17,32,0.94)",
            color: "#F8FAFC",
          },
        }}
      />
    </>
  );
}

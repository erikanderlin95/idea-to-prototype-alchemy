import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./index.css";

// App bootstrap
createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);


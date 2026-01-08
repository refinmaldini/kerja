import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyTheme, getCurrentTheme } from "./utils/theme";

// Apply personal theme on app start
const applyPersonalThemeOnStart = () => {
  const personalTheme = getCurrentTheme();
  applyTheme(personalTheme);
};

// Apply theme when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyPersonalThemeOnStart);
} else {
  applyPersonalThemeOnStart();
}

createRoot(document.getElementById("root")!).render(<App />);

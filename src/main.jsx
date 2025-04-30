import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import "next-themes";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/searchprovider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
);

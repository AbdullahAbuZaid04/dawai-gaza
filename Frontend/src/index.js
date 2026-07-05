import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <div
              dir="rtl"
              className="w-full flex flex-col min-h-screen font-sans selection:bg-primary-light selection:text-primary-dark"
            >
              <App />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

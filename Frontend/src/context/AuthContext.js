import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem("dawai_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      sessionStorage.removeItem("dawai_user");
      return null;
    }
  });

  const navigate = useNavigate();

  const login = useCallback((userData) => {
    setUser(userData);
    sessionStorage.setItem("dawai_user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("dawai_user");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }, [navigate]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

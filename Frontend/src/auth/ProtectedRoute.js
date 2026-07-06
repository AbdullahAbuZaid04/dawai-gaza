import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ role }) {
  const { user } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setChecking(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!user && !checking) return <Navigate to="/login" replace />;

  if (user && role) {
    const normalized = user.role === "Admin" ? "syndicate" : user.role?.toLowerCase();
    if (normalized !== role.toLowerCase()) {
      return <Navigate to="/" replace />;
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ui-gray">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;

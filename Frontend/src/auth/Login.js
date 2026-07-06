import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("الرجاء إدخال جميع البيانات");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });

      const token = response.data.access_token;
      let user = response.data.user;

      if (user.role === "Admin") {
        user.role = "syndicate";
      }
      localStorage.setItem("token", token);

      login(user);

      if (user.role === "syndicate") {
        navigate("/syndicate");
      } else if (user.role === "Pharmacist") {
        navigate("/pharmacist");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("حدث خطأ في الاتصال بالخادم");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-ui-bg overflow-hidden relative" dir="rtl">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 p-4 sm:p-6">
        {/* Top Link -     */}
        <div className="mb-6 w-full max-w-[420px] text-right">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-content-light font-bold bg-ui-card hover:text-content-main transition-all duration-300 px-4 py-2 rounded-xl"
          >
            <ArrowForwardIcon className="!text-[20px]" />
            <span>الرئيسية</span>
          </Link>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-[420px] bg-ui-card p-6 sm:p-8 rounded-2xl border border-dashed border-primary text-center shadow-sm mx-auto">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary text-content-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <LocalPharmacyIcon className="!text-[32px]" />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-content-main mb-2 tracking-tight">
            دخول النظام
          </h2>
          <p className="text-content-light font-medium mb-8 text-sm sm:text-base">
            أهلاً بك مجدداً في دوائي
          </p>

          {/* Error Message */}
          {error && (
            <div role="alert" className="mb-6 p-4 bg-status-error/5 text-status-error rounded-xl text-sm font-bold animate-shake border border-status-error/10">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div className="relative group text-right">
              <label htmlFor="login-email" className="block text-xs font-black text-content-light mb-1 mr-1 uppercase tracking-widest">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <EmailIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-primary !text-[20px] transition-transform pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="example@domain.com"
                  className="w-full pr-12 pl-4 py-3 sm:py-4 bg-ui-bg/25 border-2 border-ui-border rounded-xl focus:border-primary outline-none transition-all font-bold text-content-main placeholder-content-light/50 text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group text-right">
              <label htmlFor="login-password" className="block text-xs font-black text-content-light mb-1 mr-1 uppercase tracking-widest">
                كلمة المرور
              </label>
              <div className="relative">
                <LockIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-primary !text-[20px] transition-transform pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pr-12 pl-12 py-3 sm:py-4 bg-ui-bg/25 border-2 border-ui-border rounded-xl focus:border-primary focus:bg-ui-card outline-none transition-all font-bold text-content-main placeholder-content-light/50 text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-content-light hover:text-primary transition-colors p-1"
                >
                  {showPassword ? (
                    <VisibilityOff className="!text-[20px]" />
                  ) : (
                    <Visibility className="!text-[20px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 bg-primary text-content-white rounded-xl font-bold text-base sm:text-lg hover:bg-primary-700 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-content-white/30 border-t-content-white rounded-full animate-spin" />
                  جاري التحقق...
                </span>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6 pt-6 border-t border-ui-border">
            <p className="text-sm font-bold text-content-light">
              ليس لديك حساب؟{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary-700 hover:underline transition-colors"
              >
                انضم إلينا الآن
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

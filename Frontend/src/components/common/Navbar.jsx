import { useState, useEffect } from "react";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

// Hooks
import useScroll from "../../hooks/useScroll";
import { useAuth } from "../../context/AuthContext";

const citizenLinks = [
  { text: "الرئيسية", path: "/" },
  { text: "من نحن", path: "/about" },
  { text: "الأدوية", path: "/search" },
  { text: "الصيدليات", path: "/pharmacies" },
];

const syndicateLinks = [
  { text: "لوحة التحكم", path: "/syndicate" },
  { text: "إدارة النشرات", path: "/syndicate/bulletins" },
  { text: "إدارة الطلبات", path: "/syndicate/approvals" },
  { text: "مراقبة الأسعار", path: "/syndicate/price-monitoring" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const scrolled = useScroll(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openMenu = () => setMobileOpen(true);
  const closeMenu = () => setMobileOpen(false);

  const navLinks = !user
    ? citizenLinks
    : user.role?.toLowerCase() === "syndicate"
      ? syndicateLinks
      : [
          { text: "لوحة التحكم", path: "/pharmacist" },
          {
            text: "إدارة المخزون",
            path: `/pharmacist/${user?.pharmacy_id || user?.pharmacyId || ""}/inventory`,
          },
          {
            text: "إدارة الاعلانات",
            path: `/pharmacist/${user?.pharmacy_id || user?.pharmacyId || ""}/AdsManager`,
          },
        ];

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-bold"
      >
        انتقل للمحتوى الرئيسي
      </a>
      <nav
        dir="rtl"
        aria-label="التنقل الرئيسي"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ui-card/80 backdrop-blur-xl shadow-lg border-b border-ui-border"
            : "bg-ui-card"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20 w-full">
            {/* ===== Right Section: Menu + Logo ===== */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={openMenu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label="فتح القائمة"
                className="md:hidden p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition"
              >
                <MenuIcon />
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-primary text-content-white rounded-xl shadow-md transition">
                  <LocalPharmacyIcon />
                </div>
                <span className="text-xl md:text-2xl font-black text-content-main">
                  دوائي
                </span>
              </Link>
            </div>

            {/* ===== Mobile User (اسم المستخدم + زر الخروج) ===== */}
            {user && (
              <div className="flex flex-col leading-tight md:hidden">
                <span className="text-xs font-bold text-content-light">
                  مرحبا {user.full_name}
                </span>
                <button
                  onClick={logout}
                  className="mt-1 px-3 py-1 text-xs font-bold rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-content-white transition active:scale-95"
                >
                  خروج
                </button>
              </div>
            )}

            {/* ===== Desktop Links ===== */}
            <div className="hidden md:flex items-center gap-16">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isActive ? "page" : undefined}
                    className="relative font-bold text-sm transition group"
                  >
                    <span
                      className={`transition ${
                        isActive ? "text-primary" : "text-content-light"
                      } group-hover:text-primary`}
                    >
                      {link.text}
                    </span>

                    <span
                      className={`absolute -bottom-2 right-0 h-[3px] bg-primary rounded-full transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* ===== Desktop Auth Section ===== */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm font-bold text-content-light">
                    مرحباً، {user.full_name}
                  </span>
                  <button
                    onClick={logout}
                    className="px-5 py-2 rounded-full border-2 border-red-500 text-red-500 font-bold text-sm hover:bg-red-500 hover:text-content-white transition active:scale-95"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-md bg-primary text-content-white font-bold text-sm hover:bg-primary-700 transition duration-300 active:scale-95"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-md border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-content-white transition duration-300 active:scale-95"
                  >
                    إنشاء حساب
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ================= OVERLAY MOBILE ================= */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الجانبية"
        dir="rtl"
        className={`fixed top-0 right-0 h-full w-[65%] max-w-sm bg-ui-card z-50 shadow-2xl transition-transform duration-500 ease-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black text-content-main">القائمة</h2>
            <button
              onClick={closeMenu}
              aria-label="إغلاق القائمة"
              className="p-2 hover:bg-ui-border rounded-xl transition"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 flex-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`p-4 rounded-2xl font-bold transition ${
                    isActive
                      ? "bg-primary text-content-white shadow-lg shadow-primary/20"
                      : "text-content-light hover:bg-ui-border"
                  }`}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>

          {/* Mobile Login Button */}
          {!user && (
            <div className="flex flex-col gap-3 ">
              <div>
                <Link
                  to="/login"
                  className="block w-full py-4 bg-primary hover:bg-primary-700 transition-all duration-300 active:scale-95 text-content-white rounded-2xl font-bold text-center"
                >
                  تسجيل الدخول
                </Link>
              </div>
              <div>
                <Link
                  to="/register"
                  className="block w-full py-4 text-primary bg-ui-card border border-primary hover:bg-primary hover:text-content-white transition-all duration-300 active:scale-95 rounded-2xl font-bold text-center"
                >
                  إنشاء حساب
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

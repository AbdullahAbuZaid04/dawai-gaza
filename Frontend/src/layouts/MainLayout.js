import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="العودة لأعلى الصفحة"
      className={`fixed bottom-8 left-8 p-3 bg-primary text-content-white rounded-full shadow-lg hover:bg-primary-dark transition-all z-50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <KeyboardArrowUpIcon aria-hidden="true" />
    </button>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ui-bg">
      <header>
        <Navbar />
      </header>

      {/* Dynamic Spacer for fixed Navbar */}
      <div className="h-16 md:h-20" />

      <main id="main-content" className="flex-grow flex flex-col w-full overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default MainLayout;

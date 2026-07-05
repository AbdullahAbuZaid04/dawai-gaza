import { Pill, Home } from "lucide-react";
import SearchBar from "../../common/SearchBar";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState("medicine"); // "medicine" or "pharmacy"
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          opacity: 0,
          duration: 0.8,
        },
      });

      tl.fromTo(
        ".hero-title",
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
        .fromTo(
          ".hero-subtitle",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-modes",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.7"
        )
        .fromTo(
          ".hero-search",
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-tags",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-buttons",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );
    },
    { scope: container }
  );

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();

    if (searchMode === "medicine") {
      navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search-medicines");
    } else {
      navigate(query ? `/pharmacies?q=${encodeURIComponent(query)}` : "/search-pharmacies");
    }
  };

  return (
    <section
      ref={container}
      className="min-h-[90vh] w-full relative bg-ui-gray flex items-center px-6 overflow-hidden"
    >
      <div className="w-full relative z-10 text-center">
        <div className="w-full">
          <h1 className="hero-title text-4xl w-full md:text-6xl font-black text-content-main leading-[1.4] mb-8 tracking-tight">
            منصة <span className="text-primary">دوائي</span> للبحث عن الأدوية
          </h1>

          <p className="hero-subtitle text-md md:text-xl text-content-light font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
            ابحث عن الدواء الذي تحتاجه واكتشف الصيدليات التي توفره بالقرب منك. نساعدك في مقارنة
            الأسعار والتوفر بسهولة.
          </p>

          <div className="hero-modes flex justify-center mb-6">
            <div className="bg-ui-card p-1.5 rounded-2xl border border-ui-border flex gap-3 shadow-sm">
              <button
                onClick={() => setSearchMode("medicine")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  searchMode === "medicine"
                    ? "bg-primary text-content-white shadow-lg shadow-primary/20"
                    : "text-content-light hover:bg-ui-gray"
                }`}
              >
                <Pill size={18} />
                بحث عن دواء
              </button>
              <button
                onClick={() => setSearchMode("pharmacy")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  searchMode === "pharmacy"
                    ? "bg-primary text-content-white shadow-lg shadow-primary/20"
                    : "text-content-light hover:bg-ui-gray"
                }`}
              >
                <Home size={18} />
                بحث عن صيدلية
              </button>
            </div>
          </div>

          <div className="hero-search mb-10">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSearch}
              placeholder={
                searchMode === "medicine"
                  ? "اسم الدواء مثل بنادول..."
                  : "اسم الصيدلية أو المنطقة..."
              }
            />
          </div>

          <div className="hero-tags flex flex-wrap justify-center items-center gap-1 mt-6">
            <span className="text-sm font-black text-content-main ml-2">الأكثر بحثاً:</span>

            {["مالتي فيتامين", "بنادول", "باراسيتامول"].map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/search-medicines?q=${encodeURIComponent(term)}`)}
                className="hero-tag bg-primary/5 text-primary px-4 py-2 rounded-xl text-xs font-black hover:bg-primary hover:text-content-white transition-all cursor-pointer duration-300 border border-primary/10"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

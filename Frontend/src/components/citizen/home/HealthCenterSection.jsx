import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HealthCenterSection() {
  const navigate = useNavigate();
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".health-title", {
        opacity: 0,
        y: -30,
        duration: 0.8,
      })
        .from(
          ".health-desc",
          {
            opacity: 0,
            y: -20,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".health-action",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        );
    },
    { scope: container }
  );

  return (
    <section ref={container} dir="rtl" className="py-16 md:py-24 bg-ui-gray">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div>
          {/* Title */}
          <h2 className="health-title text-2xl md:text-4xl font-black text-content-main mb-6 leading-tight">
            مركز التوعية الصحية
          </h2>

          {/* Description */}
          <p className="health-desc text-sm md:text-lg text-content-light font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            نوفر لك محتوى صحي موثوق يشمل نصائح طبية، إرشادات دوائية، ونشرات توعوية لمساعدتك على
            اتخاذ قرارات صحية أفضل والاهتمام بصحتك بشكل آمن وسليم.
          </p>

          {/* Actions */}
          <div className="health-action flex justify-center">
            <button
              onClick={() => navigate("/bulletins")}
              className="px-8 md:px-12 py-3 md:py-4 bg-transparent border-2 border-primary text-primary rounded-full text-sm md:text-lg font-black hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
            >
              آخر النشرات
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

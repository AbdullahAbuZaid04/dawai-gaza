import { useRef } from "react";
import { goals } from "./aboutData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GoalsSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".goals-title", {
        opacity: 0,
        y: -20,
        duration: 0.8,
      }).from(".goal-item", {
        opacity: 0,
        y: -20,
        stagger: 0.7,
        duration: 1,
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-12 md:py-24 bg-ui-gray border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div>
          <h2 className="goals-title text-3xl md:text-5xl font-black text-primary mb-12 text-center">
            أهداف المشروع
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {goals.map((goal, i) => (
              <div
                key={i}
                className="goal-item flex items-center gap-4 bg-ui-card p-6 rounded-xl border border-ui-border shadow-sm hover:border-primary hover:scale-[1.02] transition-[border,shadow,transform] duration-300 font-black text-content-main"
              >
                <span className="text-primary text-xl shrink-0">✦</span>
                {goal}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

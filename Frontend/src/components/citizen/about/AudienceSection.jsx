import { useRef } from "react";
import { audience } from "./aboutData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AudienceSection() {
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

      tl.from(".audience-title", {
        y: -30,
        opacity: 0,
        duration: 0.8,
      }).from(
        ".audience-card",
        {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div>
          <h2 className="audience-title text-3xl md:text-5xl font-black text-primary mb-8 tracking-tight">
            من نخدم في منصتنا؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {audience.map((item, i) => (
              <div
                key={i}
                className="audience-card group block bg-ui-gray p-10 rounded-2xl border border-ui-border transform  hover:border-primary transition-colors duration-300"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-black text-primary mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-content-light leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

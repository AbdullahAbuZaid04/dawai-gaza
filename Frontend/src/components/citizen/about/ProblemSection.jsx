import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".title", {
        y: -100,
        delay: 1.5,
        opacity: 0,
        duration: 1,
      }).from(".desc", {
        y: -40,
        opacity: 0,
        duration: 0.8,
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-12 md:py-24 bg-ui-card">
      <div className="problem-content max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div>
          <h2 className="title text-3xl md:text-5xl font-black text-primary mb-8 tracking-tight">
            المشكلة
          </h2>
          <p className="desc text-lg md:text-xl text-content-light max-w-4xl mx-auto leading-loose font-medium">
            في ظل التحديات الجغرافية والاقتصادية في قطاع غزة، يجد المواطن نفسه في رحلة بحث مضنية
            للحصول على أصناف دوائية معينة.
          </p>
        </div>
      </div>
    </section>
  );
}

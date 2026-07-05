import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function AboutHeroSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".about-title", {
        y: -100,
        opacity: 0,
        duration: 1,
      }).from(".about-subtitle", {
        y: -40,
        opacity: 0,
        duration: 0.8,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full py-12 md:py-24 text-center text-content-white bg-gradient-to-br from-[#24867c] to-[#2ea79b] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="inline-block">
          <h1 className="about-title text-4xl md:text-6xl font-black mb-10 tracking-tight">
            منصة دوائي
          </h1>

          <div className="about-subtitle text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            منصة رقمية تربط المواطنيـن والصيدليـات ونقـابة الصيـادلة في غزة ضمن نظام رقمي واحد
            وموثوق.
          </div>
        </div>
      </div>
    </section>
  );
}

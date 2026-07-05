import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
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
      tl.from(".title", {
        y: -100,
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
    <section ref={container} className="py-12 md:py-24 bg-ui-gray border-y border-ui-border">
      <div className="vision-content max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div>
          <h2 className="title text-3xl md:text-5xl font-black text-primary mb-8 tracking-tight">
            رؤيتنا
          </h2>
          <p className="desc text-lg md:text-xl text-content-light max-w-4xl mx-auto leading-loose font-medium">
            نسعى لتغيير واقع الرعاية الصحية في غزة من خلال توفير حلول تقنية ذكية تضمن الشفافية،
            العدالة، والسرعة في الوصول للدواء، والمساهمة في إنقاذ الأرواح في الظروف الاستثنائية.
          </p>
        </div>
      </div>
    </section>
  );
}

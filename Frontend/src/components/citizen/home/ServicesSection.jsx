import { useRef } from "react";
import ServiceCard from "../home/components/ServiceCard";
import { services } from "./homeData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          opacity: 0,
          duration: 0.8,
        },
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".services-title", {
        y: -40,
      }).from(".services-subtitle", {
        y: -30,
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".service-card",
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="services-title text-3xl md:text-5xl font-black text-content-main mb-6">
            لماذا تختار دوائي؟
          </h2>

          <p className="services-subtitle text-base md:text-xl text-content-light font-medium max-w-2xl mx-auto leading-relaxed">
            نوفر لك أفضل تجربة للبحث عن الأدوية ومعرفة توفرها بسهولة ودقة عالية من خلال تقنياتنا
            الحديثة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <ServiceCard {...service} tinted={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

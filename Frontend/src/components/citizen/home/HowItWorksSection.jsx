import ServiceCard from "../home/components/ServiceCard";
import MainButton from "../../common/MainButton";
import { steps } from "./homeData";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
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

      tl.from(".title", {
        y: -40,
      }).from(".subtitle", {
        y: -30,
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(".work-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".work-card",
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(".work-cta", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".work-cta",
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-20 md:py-32 bg-ui-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="mb-20">
          <h2 className="title text-3xl md:text-5xl font-black text-content-main mb-6">
            كيف يعمل دوائي؟
          </h2>
          <p className="subtitle text-base md:text-xl text-content-light font-medium">
            ثلاث خطوات بسيطة للعثور على دوائك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="work-card">
              <ServiceCard
                icon={item.icon}
                title={item.title}
                description={item.desc}
                color={item.color}
                step={item.step}
              />
            </div>
          ))}
        </div>

        <div className="work-cta mt-20">
          <h3 className="text-2xl font-black text-slate-800 mb-8">
            جرب الآن وابحث عن دوائك بسهولة
          </h3>
          <div className="flex justify-center gap-4">
            <MainButton variant="contained" size="large" to="/search">
              البحث
            </MainButton>
            <MainButton variant="outlined" size="large" to="/about">
              تعرف على المزيد
            </MainButton>
          </div>
        </div>
      </div>
    </section>
  );
}

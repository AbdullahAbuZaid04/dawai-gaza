import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import PharmaciesCard from "../shared/PharmaciesCard";
import MainButton from "../../common/MainButton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedPharmaciesSection() {
  const [pharmacies, setPharmacies] = useState([]);
  const container = useRef(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/pharmacies`);

        const formattedData = res.data.map((p) => ({
          id: p.id,
          name: p.name,
          location: p.location || "الموقع غير متوفر",
          connect: { phoneNumber: p.phone || "غير متوفر" },
          working: {
            open: p.open_time,
            close: p.close_time,
          },
          lat: p.lat,
          lng: p.lng,
        }));

        setPharmacies(formattedData.slice(0, 4));
      } catch (err) {
        console.error("خطأ في جلب الصيدليات:", err);
      }
    };
    fetchPharmacies();
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".pharm-title",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      )
        .fromTo(
          ".pharm-subtitle",
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ".pharmacy-card-wrapper",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".pharm-action",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-20 md:py-32 bg-ui-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="pharm-title text-3xl md:text-5xl font-black text-content-main mb-6">
            الصيدليات المقترحة
          </h2>
          <p className="pharm-subtitle text-base md:text-xl text-content-light font-medium max-w-2xl mx-auto">
            اكتشف الصيدليات المعتمدة في منطقتك واعرف توفر الأدوية بشكل فوري من خلال قاعدتنا
            المتكاملة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="pharmacy-card-wrapper">
              <PharmaciesCard pharmacy={pharmacy} tinted={true} />
            </div>
          ))}
        </div>

        <div className="pharm-action text-center mt-12">
          <MainButton variant="contained" size="large" to="/pharmacies" className="shadow-xl">
            عرض كل الصيدليات
          </MainButton>
        </div>
      </div>
    </section>
  );
}

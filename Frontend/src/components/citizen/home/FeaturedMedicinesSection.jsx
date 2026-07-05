import React, { useState, useEffect, useRef } from "react"; //
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import MainButton from "../../common/MainButton";
import MedicineCard from "../shared/MedicineCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedMedicinesSection() {
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const container = useRef(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const [resInventory, resPharmacies] = await Promise.all([
          axios.get(`${API_BASE_URL}/inventory`),
          axios.get(`${API_BASE_URL}/pharmacies`),
        ]);

        const pharmacyMap = {};
        resPharmacies.data.forEach((p) => (pharmacyMap[p.id] = p));

        const formattedData = resInventory.data.map((item) => {
          const pharmacyData = pharmacyMap[item.pharmacy_id]; //

          return {
            pharmacy: {
              id: item.pharmacy_id,
              name_ar: pharmacyData ? pharmacyData.name : item.pharmacy_name,
              location: pharmacyData ? pharmacyData.address_note : "الموقع غير متوفر",
            },
            medicine: {
              id: item.medicine_id,
              name_ar: item.name_ar,
              dosage_form: item.dosage_form,
              price: item.price,
              quantity: item.quantity,
              available: item.stock_status,
            },
          };
        });

        setFeaturedMedicines(formattedData.slice(0, 4));
      } catch (err) {
        console.error("خطأ في الربط:", err);
      }
    };
    fetchFeatured();
  }, []);

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="section-title text-3xl md:text-5xl font-black text-content-main mb-6">
            الأدوية المتوفرة
          </h2>
          <p className="section-subtitle text-base md:text-xl text-content-light font-medium max-w-2xl mx-auto">
            تصفح الأدوية الأكثر بحثاً واكتشف توفرها في الصيدليات القريبة منك.
          </p>
        </div>

        {/*     */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredMedicines.map((item, index) => (
            <div key={`${item.pharmacy.id}-${item.medicine.id}`} className="medicine-card-wrapper">
              <MedicineCard item={item} index={index} tinted={true} />
            </div>
          ))}
        </div>

        <div className="section-action text-center mt-12">
          <MainButton variant="outlined" size="large" to="/search">
            عرض كل الأدوية
          </MainButton>
        </div>
      </div>
    </section>
  );
}

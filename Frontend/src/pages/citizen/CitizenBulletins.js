import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
// Components
import BulletinHeader from "../../components/citizen/bulletins/BulletinHeader";
import BulletinTabs from "../../components/citizen/bulletins/BulletinTabs";
import BulletinList from "../../components/citizen/bulletins/BulletinList";
import OfferList from "../../components/citizen/bulletins/OfferList";

export default function CitizenBulletins() {
  const [activeTab, setActiveTab] = useState("bulletins");
  const [bulletins, setBulletins] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const centersRes = await axios.get(`${API_BASE_URL}/centers`);
        const promosRes = await axios.get(`${API_BASE_URL}/promotions?type=advertisement`);

        setBulletins(centersRes.data);
        setOffers(promosRes.data);
      } catch (err) {
        console.error("خطأ في  البيانات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div dir="rtl" className="min-h-screen bg-ui-gray text-right py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto">
        <BulletinHeader />
        <BulletinTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="h-full">
          {activeTab === "bulletins" ? (
            <BulletinList bulletins={bulletins} />
          ) : (
            <OfferList offers={offers} />
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config/api";

import { Pill, Tag, Info, Map as MapIcon } from "lucide-react";
import ProfileSidebar from "../../components/citizen/pharmacy-profile/ProfileSidebar";
import MedicineInventory from "../../components/citizen/pharmacy-profile/MedicineInventory";
import PharmacyOffers from "../../components/citizen/pharmacy-profile/PharmacyOffers";
import ContactSection from "../../components/citizen/pharmacy-profile/ContactSection";
import LocationSection from "../../components/citizen/pharmacy-profile/LocationSection";
import NotFoundState from "../../components/common/NotFoundState";

function PharmacyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPharmacyData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API_BASE_URL}/pharmacies/${id}`);
        const prom = await axios.get(`${API_BASE_URL}/pharmacies/${id}/promotions`, config);

        setPharmacy(res.data);
        setPromotions(prom.data?.promotions || prom.data || []);
      } catch (err) {
        console.error("خطأ في  بيانات الصيدلية:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacyData();
  }, [id]);

  if (loading) return <div className="text-center py-20">جاري تحميل ملف الصيدلية...</div>;

  if (!pharmacy) {
    return (
      <NotFoundState
        title="الصيدلية غير موجودة"
        actionLabel="العودة للبحث"
        onAction={() => navigate("/pharmacies")}
      />
    );
  }

  const inventory = pharmacy.inventory || pharmacy.medicines || [];
  const filteredMedicines = inventory.filter((m) => {
    const name = m.medicine?.name_ar || m.nameAr || m.name_ar || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const tabs = [
    { id: 0, label: "الأدوية", icon: <Pill size={20} /> },
    { id: 1, label: "التواصل", icon: <Info size={20} /> },
    { id: 2, label: "الموقع", icon: <MapIcon size={20} /> },
    { id: 3, label: "العروض", icon: <Tag size={20} /> },
  ];

  return (
    <div
      dir="rtl"
      className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-72px)] w-full bg-ui-gray overflow-hidden text-right"
    >
      <ProfileSidebar
        pharmacy={pharmacy}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex-grow p-4 md:p-8 md:overflow-y-auto bg-ui-gray/50">
        <div className="h-full max-w-[1400px] mx-auto">
          {activeTab === 0 && (
            <MedicineInventory
              pharmacyId={pharmacy.id}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              medicines={filteredMedicines}
            />
          )}
          {activeTab === 1 && <ContactSection pharmacy={pharmacy} />}
          {activeTab === 2 && <LocationSection pharmacy={pharmacy} />}
          {activeTab === 3 && <PharmacyOffers offers={promotions} />}
        </div>
      </main>
    </div>
  );
}

export default PharmacyProfile;

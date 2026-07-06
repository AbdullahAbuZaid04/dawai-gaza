import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { Megaphone } from "lucide-react";
import PageHeader from "../../components/pharmacist/PageHeader";
import AdCard from "../../components/pharmacist/AdCard";
import AdModal from "../../components/pharmacist/AdModal";

function AdsManager() {
  const { user } = useAuth();
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
    start_date: "",
    end_date: "",
    imageUrl: "",
    imageFile: null,
  });

  const token = localStorage.getItem("token");
  const config = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);
  const pharmacyId = user?.pharmacy_id || user?.pharmacyId;

  useEffect(() => {
    const fetchPromotions = async () => {
      if (!pharmacyId) return;
      try {
        const res = await axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}/promotions`, config);
        setPromotions(res.data.promotions);
      } catch (err) {
        console.error("Error fetching promotions:", err);
      }
    };
    if (pharmacyId) fetchPromotions();
  }, [user, pharmacyId, config]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("start_date", formData.start_date);
    data.append("end_date", formData.end_date);
    data.append("priority", formData.priority || "normal");
    data.append("pharmacy_id", pharmacyId);
    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}/promotions`, data, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      setPromotions((prev) => [...prev, res.data]);
      setShowModal(false);
      setFormData({ title: "", description: "", priority: "normal", start_date: "", end_date: "", imageUrl: "", imageFile: null });
    } catch (err) {
      console.error("Error creating promotion:", err);
      alert("حدث خطأ أثناء نشر الإعلان. يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      <PageHeader
        title="إدارة الإعلانات"
        description="انشر إعلانات وعروض صيدليتك للمواطنين"
        actionButton={
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 transition flex items-center gap-2 active:scale-95 shadow-lg shadow-primary/20"
          >
            <Megaphone className="w-5 h-5" />
            نشر إعلان جديد
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.length > 0 ? (
          promotions.map((ad) => <AdCard key={ad.id} ad={ad} />)
        ) : (
          <div className="col-span-full bg-ui-card rounded-2xl p-12 text-center border border-dashed border-ui-border">
            <div className="w-20 h-20 bg-ui-card rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-ui-border">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-content-main mb-2">لا توجد إعلانات نشطة</h3>
            <p className="text-content-light font-medium">
              ابدأ بنشر عروضك وإعلاناتك وتواصل مع المواطنين الآن.
            </p>
          </div>
        )}
      </div>

      <AdModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default AdsManager;

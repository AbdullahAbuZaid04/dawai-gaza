import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config/api";

// Icons
import { ArrowRight } from "lucide-react";

// Components
import MedicineHeader from "../../components/citizen/medicine/MedicineHeader";
import MedicineUsage from "../../components/citizen/medicine/MedicineUsage";
import MedicineWarnings from "../../components/citizen/medicine/MedicineWarnings";
import MainButton from "../../components/common/MainButton";
import NotFoundState from "../../components/common/NotFoundState";

const MedicineDetails = () => {
  const { pharmacyId, medicineId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/inventory/${pharmacyId}/${medicineId}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [pharmacyId, medicineId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">جاري تحميل التفاصيل...</div>
    );
  }

  if (!data || !data.medicine) {
    return (
      <NotFoundState
        title="عذراً، الدواء غير موجود"
        actionLabel="العودة للسابق"
        onAction={() => navigate(-1)}
      />
    );
  }

  const { medicine, pharmacy } = data;

  return (
    <div className="min-h-screen bg-ui-gray/40 text-right py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-content-light font-bold hover:text-primary transition-colors py-2"
          >
            <ArrowRight size={20} />
            <span>العودة للسابق</span>
          </button>
        </div>

        <div className="detail-card bg-white rounded-3xl shadow-xl shadow-primary/5 border border-ui-border p-8 lg:p-14 overflow-hidden relative">
          {/*  */}
          <MedicineHeader medicine={medicine} pharmacy={pharmacy} />

          <div className="h-px bg-ui-border mb-12" />

          <MedicineUsage medicine={medicine} />

          <MedicineWarnings medicine={medicine} />

          <div className="detail-item mt-16 pt-8 border-t border-ui-border flex justify-center">
            <MainButton
              variant="outlined"
              onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
              className="rounded-2xl"
            >
              زيارة صفحة الصيدلية
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;

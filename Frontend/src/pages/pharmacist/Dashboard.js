import React, { useState, useEffect } from "react";
import { Building2, Package, AlertTriangle, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import PageHeader from "../../components/pharmacist/PageHeader";
import DashboardKpiCard from "../../components/pharmacist/DashboardKpiCard";
import LowStockList from "../../components/pharmacist/LowStockList";

function PharmacistDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [medicines, setMedicines] = useState([]);
  const [offers, setOffers] = useState([]);
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const pharmacyId = user?.pharmacy_id || user?.pharmacyId;

  useEffect(() => {
    const fetchData = async () => {
      if (!pharmacyId) {
        console.warn("Pharmacy ID is missing!");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [invRes, pharmRes, offersRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}/inventory`, config),
          axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}`),
          axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}/promotions`, config),
        ]);
        setMedicines(invRes.data.inventory || []);
        setPharmacy(pharmRes.data);
        setOffers(offersRes.data.promotions);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (pharmacyId) fetchData();
  }, [user, pharmacyId]);

  const lowStockItems = medicines.filter((m) => m.stock_status === "Low Stock");
  if (loading) return <div className="p-12 text-center">جاري تحميل لوحة التحكم...</div>;

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      {/* Header    */}
      <PageHeader
        title="لوحة تحكم الصيدلية"
        description={`إدارة النواقص والمخزون في صورتها المباشرة لـ ${pharmacy?.name || "الصيدلية"}`}
        actionButton={
          <button
            onClick={() => navigate(`/pharmacist/${pharmacyId}/inventory`)}
            className="px-6 py-3 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            المخزون
          </button>
        }
      />

      {/* KPI Section   */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardKpiCard
          title="إجمالي الأدوية المسجلة"
          value={medicines.length.toLocaleString()}
          icon={Package}
          colorClass={{
            bg: "bg-status-success/10",
            text: "text-status-success",
            border: "border-status-success/50",
          }}
        />
        <DashboardKpiCard
          title="أدوية تقترب من النفاد"
          value={lowStockItems.length}
          icon={AlertTriangle}
          colorClass={{
            bg: "bg-status-warning/10",
            text: "text-status-warning",
            border: "border-status-warning/50",
          }}
        />
        <DashboardKpiCard
          title="الموقع الحالي"
          value={pharmacy?.location || "غير محدد"}
          icon={Building2}
          colorClass={{ bg: "bg-primary/10", text: "text-primary", border: "border-primary/50" }}
        />
        <DashboardKpiCard
          title="الإعلانات النشطة"
          value={offers.length || 0}
          icon={Megaphone}
          colorClass={{ bg: "bg-primary/10", text: "text-primary", border: "border-primary/50" }}
        />
      </div>

      {/* Main Content Area  */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-ui-card p-6 rounded-xl shadow-sm border border-ui-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-content-main flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-error"></span>
              أدوية قاربت على النفاد
            </h2>
            {lowStockItems.length > 0 && (
              <button
                onClick={() => navigate(`/pharmacist/${pharmacyId}/inventory`)}
                className="text-primary font-bold hover:underline"
              >
                المخزون
              </button>
            )}
          </div>
          <LowStockList lowStockItems={lowStockItems} />
        </div>
      </div>
    </div>
  );
}

export default PharmacistDashboard;

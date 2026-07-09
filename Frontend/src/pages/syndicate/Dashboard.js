import React, { useState, useEffect } from "react";
import ApprovalIcon from "@mui/icons-material/HowToReg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function SyndicateDashboard() {
  const navigate = useNavigate();
  const [violations, setViolations] = useState([]);

  const [pharmaciesCount, setPharmaciesCount] = useState(0);
  const [medicinesCount, setMedicinesCount] = useState(0);
  const [pending, setPending] = useState([]);
  const [promotionsCount, setPromotionsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const violationsRes = await axios.get(`${API_BASE_URL}/violations`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const pharmaciesRes = await axios.get(`${API_BASE_URL}/pharmacies`);
        const allPharmacies = pharmaciesRes.data || [];
        setPharmaciesCount(allPharmacies.filter((p) => p.is_active === true).length);

        const medicinesRes = await axios.get(`${API_BASE_URL}/medicines`);
        setMedicinesCount(medicinesRes.data.total || 0);

        const pharmacistsRes = await axios.get(`${API_BASE_URL}/users/pharmacists`, config);
        const allUsers = pharmacistsRes.data || [];

        const pendingRequests = allUsers.filter(
          (u) => u.is_active === false && u.status === "pending"
        );
        setViolations(violationsRes.data);

        setPending(pendingRequests);

        const promotionsRes = await axios.get(`${API_BASE_URL}/promotions?type=circular`);
        setPromotionsCount(Array.isArray(promotionsRes.data) ? promotionsRes.data.length : promotionsRes.data?.data?.length || 0);
      } catch (error) {
        console.error("خطأ  :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStyle = (status) => {
    const styles = {
      success: {
        bg: "bg-status-success/10",
        text: "text-status-success",
        border: "border-status-success",
      },
      warning: {
        bg: "bg-status-warning/10",
        text: "text-status-warning",
        border: "border-status-warning",
      },
      error: {
        bg: "bg-status-error/10",
        text: "text-status-error",
        border: "border-status-error",
      },
    };
    return styles[status] || styles.success;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-ui-gray">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-content-main tracking-tight">
            لوحة تحكم النقابة
          </h1>
          <p className="text-content-light font-medium mt-1">
            {" "}
            إدارة الرقابة، التراخيص، والتعاميم لشبكة الصيدليات
          </p>
        </div>

        <button
          onClick={() => navigate("/syndicate/bulletins")}
          className="px-6 py-3 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2"
        >
          <CampaignOutlinedIcon className="w-5 h-5" />
          مركز التعاميم
        </button>
      </div>

      {/* KPI Section */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "إجمالي الصيدليات",
            value: pharmaciesCount.toLocaleString(),
            icon: <BusinessIcon />,
            color: "success",
            trend: "حقيقي",
            path: "/syndicate/pharmacies",
          },
          {
            title: "إجمالي الأدوية",
            value: medicinesCount.toLocaleString(),
            icon: <Inventory2OutlinedIcon />,
            color: "success",
            trend: "حقيقي",
            path: "/syndicate/medicines",
          },
          {
            title: "طلبات الاعتماد",
            value: pending.length,
            icon: <ApprovalIcon />,
            color: "warning",
            trend: "معلق",
            path: "/syndicate/approvals",
          },
          {
            title: "التعاميم النشطة",
            value: promotionsCount,
            icon: <AssignmentIcon />,
            color: "error",
            trend: "محدث",
            path: "/syndicate/bulletins",
          },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`bg-ui-card p-6 rounded-xl shadow-sm border border-dashed ${getStyle(item.color).border} hover:shadow-xl transition-all duration-300 cursor-pointer`}
          >
            <div className="flex justify-between items-center mb-6">
              <div
                className={`p-4 rounded-2xl ${getStyle(item.color).bg} ${getStyle(item.color).text}`}
              >
                {item.icon}
              </div>
              <span
                className={`px-2 py-1 rounded-lg text-xs font-bold ${getStyle(item.color).text} border ${getStyle(item.color).border}`}
              >
                {item.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-content-main mb-1">{item.value}</div>
            <div className="text-content-light font-bold">{item.title}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-ui-card p-6 rounded-xl shadow-sm border border-ui-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-content-main flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-error"></span>
              البلاغات الأخيرة (مراقبة الأسعار)
            </h2>
            <button
              onClick={() => navigate("/syndicate/price-monitoring")}
              className="text-primary font-bold hover:underline"
            >
              عرض الكل
            </button>
          </div>

          <div className="space-y-4">
            {violations.length === 0 ? (
              <p className="text-center text-content-main py-4 font-bold">لا توجد بلاغات حالياً</p>
            ) : (
              violations.slice(0, 4).map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-xl border border-ui-border flex justify-between items-center hover:bg-ui-gray/50 hover:border-primary transition-all duration-300"
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-1 h-12 rounded-full ${v.status === "new" ? "bg-status-error" : "bg-status-warning"}`}
                    />
                    <div>
                      <div className="font-bold text-content-main">{v.pharmacy}</div>
                      {/*     */}
                      <div className="text-sm text-status-error font-extrabold mt-1">
                        {v.medicine}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-content-light mb-2">{v.date}</div>
                    <span
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold ${v.status === "new" ? "bg-status-error/10 text-status-error" : "bg-status-warning/10 text-status-warning"}`}
                    >
                      {v.status === "new" ? "عالي الخطورة" : "متوسط"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pharmacists Quick View */}
        <div className="lg:col-span-1 bg-ui-card p-6 rounded-xl shadow-sm border border-ui-border">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-extrabold text-content-main"> طلبات معلقة</h2>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold">
              {pending.length}{" "}
            </span>
          </div>
          <p className="text-sm text-content-light mb-6">مراجعة سريعة لأحدث طلبات التراخيص </p>

          <div className="space-y-2">
            {pending.length === 0 ? (
              <p className="text-center py-4 font-bold text-content-main">
                لا يوجد طلبات معلقة حالياً
              </p>
            ) : (
              pending.slice(0, 5).map((ph, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-ui-border bg-ui-card/50 flex items-center justify-between hover:border-primary transition-all duration-300"
                >
                  <div>
                    <div className="font-bold text-content-main text-base">{ph.full_name}</div>
                    <div className="text-xs text-content-light mt-1">
                      {ph.email} | {ph.phone}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${ph.is_active ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"}`}
                  >
                    {ph.is_active ? "نشط" : "بحاجة لتفعيل"}
                  </span>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => navigate("/syndicate/approvals")}
            className="w-full py-3 border border-ui-border text-content-light rounded-xl font-bold hover:bg-ui-gray hover:text-content-main hover:border-primary transition-all duration-300 mt-8"
          >
            إدارة جميع الطلبات
          </button>
        </div>
      </div>
    </div>
  );
}

export default SyndicateDashboard;

import { useState, useEffect, useMemo } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import GavelIcon from "@mui/icons-material/Gavel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function PriceMonitoring() {
  const [violations, setViolations] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [compareSearch, setCompareSearch] = useState("");
  const [violationsPage] = useState(0);
  const rowsPerPage = 10;

  const token = localStorage.getItem("token");
  const config = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

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
      error: { bg: "bg-status-error/10", text: "text-status-error", border: "border-status-error" },
    };
    return styles[status] || styles.success;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [violRes, invRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/violations`, config),
          axios.get(`${API_BASE_URL}/inventory`, config),
        ]);
        setViolations(violRes.data);
        setMedicines(invRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    loadData();
  }, [config]);

  const handleAction = async (id, action) => {
    const status = action === "warn" ? "warned" : "fined";
    try {
      await axios.patch(`${API_BASE_URL}/violations/${id}/status`, { status }, config);
      setViolations((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
      setSnackbar({
        open: true,
        message: action === "warn" ? "تم إرسال التحذير بنجاح" : "تم تسجيل المخالفة المالية",
      });
      setTimeout(() => setSnackbar({ open: false, message: "" }), 3000);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getDeviation = (official, sold) =>
    official ? (((sold - official) / official) * 100).toFixed(1) : 0;

  const filteredData = violations.filter((item) => {
    const matchesSearch =
      item.pharmacy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medicine.toLowerCase().includes(searchTerm.toLowerCase());
    return activeTab === 0
      ? item.status === "new" && matchesSearch
      : (item.status === "warned" || item.status === "fined") && matchesSearch;
  });

  const stats = {
    total: violations.length,
    active: violations.filter((v) => v.status === "new").length,
    fined: violations.filter((v) => v.status === "fined").length,
    warned: violations.filter((v) => v.status === "warned").length,
  };

  return (
    <div className="p-4 md:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-content-main">مراقبة الأسعار</h1>
        <p className="text-content-light mt-1">
          {" "}
          متابعة الالتزام بالتسعيرة الدوائية الرسمية واتخاذ الإجراءات التأديبية{" "}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "إجمالي البلاغات",
            value: stats.total,
            border: "border-status-success",
            text: "text-status-success",
            icon: <AssignmentIcon />,
            color: "success",
          },
          {
            label: "تجاوزات نشطة",
            value: stats.active,
            border: "border-content-main",
            text: "text-content-main",
            icon: <WarningIcon />,
            color: "warning",
          },
          {
            label: "تحذيرات ",
            value: stats.warned,
            border: "border-status-error",
            text: "text-status-error",
            icon: <WarningIcon />,
            color: "warning",
          },
          {
            label: "مخالفات مالية",
            value: stats.fined,
            border: "border-status-warning",
            text: "text-status-warning",
            icon: <GavelIcon />,
            color: "error",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-ui-card p-8 rounded-xl shadow-sm border border-dashed ${stat.border}`}
          >
            <span
              className={`p-4 rounded-2xl  ${getStyle(stat.color).bg} ${getStyle(stat.color).text}`}
            >
              {stat.icon}
            </span>
            <p className="text-sm text-content-light font-bold mb-1 mt-5">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-end">
        <input
          className="px-4 py-2 border rounded-lg w-64"
          placeholder="بحث في البلاغات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-ui-border mb-6 gap-8">
        <button
          onClick={() => setActiveTab(0)}
          className={`pb-3 ${activeTab === 0 ? "border-b-2 border-primary text-primary font-bold" : "text-content-light"}`}
        >
          نشطة ({stats.active})
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`pb-3 ${activeTab === 1 ? "border-b-2 border-primary text-primary font-bold" : "text-content-light"}`}
        >
          مغلقة ({stats.total - stats.active})
        </button>
      </div>

      {/* Violations Table */}
      <div className="bg-ui-card rounded-xl shadow-sm border border-ui-border overflow-hidden mb-12">
        <table className="w-full text-sm text-center">
          <thead className="bg-ui-gray border-b border-ui-border">
            <tr>
              {[
                "الصيدلية",
                "الدواء",
                "السعر الرسمي",
                "السعر المخالف",
                "الزيادة",
                "الحالة",
                "الإجراءات",
              ].map((h) => (
                <th key={h} className="px-6 py-4 font-bold text-content-main">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredData
              .slice(violationsPage * rowsPerPage, (violationsPage + 1) * rowsPerPage)
              .map((row) => (
                <tr key={row.id} className="hover:bg-ui-gray transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-content-main">{row.pharmacy}</div>
                    <div className="text-xs text-content-light mt-1">{row.date}</div>
                  </td>
                  <td className="px-6 py-4 text-content-light font-medium">{row.medicine}</td>
                  <td className="px-6 py-4 text-status-success font-bold">{row.officialPrice} ₪</td>
                  <td className="px-6 py-4 text-status-error font-bold">{row.soldPrice} ₪</td>
                  <td className="px-6 py-4">
                    <span className="bg-status-error/10 text-status-error px-2 py-1 rounded-lg text-xs font-bold">
                      +{getDeviation(row.officialPrice, row.soldPrice)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium">
                    {row.status === "new" && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                        غير معالج
                      </span>
                    )}
                    {row.status === "warned" && (
                      <span className="bg-status-warning/10 text-status-warning px-2 py-1 rounded-full">
                        تم التحذير
                      </span>
                    )}
                    {row.status === "fined" && (
                      <span className="bg-status-error/10 text-status-error px-2 py-1 rounded-full">
                        تمت المخالفة
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {activeTab === 0 && (
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleAction(row.id, "warn")}>
                          <WarningIcon className="text-status-warning" />
                        </button>
                        <button onClick={() => handleAction(row.id, "fine")}>
                          <GavelIcon className="text-status-error" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Comparison Section */}
      <div className="bg-ui-card rounded-xl shadow-sm border border-ui-border overflow-hidden">
        <div className="p-6 border-b border-ui-border">
          <h2 className="text-xl font-bold text-content-main">مقارنة أسعار دواء</h2>
          <p className="text-content-light mt-1">
            {" "}
            تحليل فرق السعر لنفس الصنف بين الصيدليات المختلفة{" "}
          </p>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <input
              className="px-4 py-2 border rounded-lg w-64"
              placeholder="اسم الدواء..."
              value={compareSearch}
              onChange={(e) => setCompareSearch(e.target.value)}
            />
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold">تحديث</button>
          </div>
          {/* Comparison Table -   */}
          <table className="w-full  border border-ui-border">
            <thead className="bg-ui-gray border-b font-bold">
              <tr>
                {["الصيدلية", "الدواء", "السعر", "الحالة", "تاريخ الانتهاء"].map((h) => (
                  <th key={h} className="p-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {medicines
                .filter((m) => m.name_ar.includes(compareSearch))
                .map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3 ">{item.pharmacy_name}</td>
                    <td className="p-3">{item.name_ar}</td>
                    <td className="p-3 text-primary font-bold">{item.price} ₪</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.stock_status === "In Stock" ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"}`}
                      >
                        {item.stock_status}
                      </span>
                    </td>
                    <td className="p-3 text-content-light">{item.expiry_date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {snackbar.open && (
        <div className="fixed bottom-8 left-8 bg-black text-white px-6 py-3 rounded-xl z-50">
          {snackbar.message}
        </div>
      )}
    </div>
  );
}

export default PriceMonitoring;

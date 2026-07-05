import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function Approvals() {
  const [pharmacists, setPharmacists] = useState([]); //
  const [selectedTab, setSelectedTab] = useState("pending");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(`${API_BASE_URL}/users/pharmacists`, config);
      setPharmacists(response.data || []);
    } catch (error) {
      console.error("خطأ في جلب طلبات الاعتماد:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getOnlyPharmacists = () => {
    const currentAdminId = localStorage.getItem("user_id");

    return pharmacists
      .map((r) => {
        let normalizedStatus = r.status || "pending";

        if (normalizedStatus === "pending") {
          if (r.is_active === true) normalizedStatus = "approved";
          else if (r.is_active === false && r.reject_reason) normalizedStatus = "rejected";
        }

        return { ...r, status: normalizedStatus };
      })
      .filter((r) => r.user_id !== Number(currentAdminId) && r.role !== "Admin");
  };

  const filteredRequests = getOnlyPharmacists().filter((r) => {
    return r.status === selectedTab;
  });

  const countByStatus = (status) => {
    return getOnlyPharmacists().filter((r) => r.status === status).length;
  };

  const getStatusBadge = (row) => {
    switch (row.status) {
      case "approved":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            معتمد
          </span>
        );
      case "rejected":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
            مرفوض
          </span>
        );
      default:
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
            قيد المراجعة
          </span>
        );
    }
  };

  const handleOpenReview = (req) => {
    setSelectedRequest(req);
    setOpenModal(true);
    setRejectReason(req.reject_reason || req.reason || "");
    setRejectError(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRequest(null);
    setRejectReason("");
    setRejectError(false);
  };

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.patch(
        `${API_BASE_URL}/users/${selectedRequest.user_id}/status`,
        {
          status: "approved",
          is_active: true,
        },
        config
      );

      setPharmacists(
        pharmacists.map((p) =>
          p.user_id === selectedRequest.user_id ? { ...p, status: "approved", is_active: true } : p
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("خطأ:", error);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setRejectError(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.patch(
        `${API_BASE_URL}/users/${selectedRequest.user_id}/status`,
        {
          status: "rejected",
          is_active: false,
          reject_reason: rejectReason,
        },
        config
      );

      setPharmacists(
        pharmacists.map((p) =>
          p.user_id === selectedRequest.user_id
            ? { ...p, status: "rejected", is_active: false, reject_reason: rejectReason }
            : p
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("خطأ:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-ui-gray/50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray/50 text-right" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-content-main tracking-tight">
          طلبات اعتماد الصيدليات
        </h1>
        <p className="text-content-light mt-1">
          مراجعة واعتماد طلبات الترخيص والاشتراك الجديدة لضمان الامتثال للمعايير{" "}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-ui-card rounded-xl shadow-sm border border-ui-border flex p-1 mb-6 overflow-x-auto whitespace-nowrap gap-1">
        {[
          { key: "pending", label: "قيد المراجعة" },
          { key: "approved", label: "تم الاعتماد" },
          { key: "rejected", label: "مرفوضة" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex-1 flex flex-col sm:flex-row justify-center items-center gap-3 py-3 rounded-lg font-bold transition-all ${
              selectedTab === tab.key
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-content-light hover:bg-ui-gray/50"
            }`}
          >
            {tab.label}
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                selectedTab === tab.key
                  ? "bg-white text-primary"
                  : "bg-ui-gray/50 text-content-light"
              }`}
            >
              {countByStatus(tab.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-ui-card rounded-xl shadow-sm border border-ui-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-ui-gray border-b border-ui-border">
              <tr>
                {[
                  " الصيدلية",
                  "البريد الإلكتروني",
                  "رقم الهاتف",
                  "الموقع ",
                  "الحالة",
                  "الإجراء",
                ].map((head) => (
                  <th key={head} className="px-6 py-4 font-extrabold text-content-light">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-20 text-center opacity-30 text-content-light text-lg font-bold"
                  >
                    لا توجد طلبات في هذا القسم حالياً
                  </td>
                </tr>
              ) : (
                filteredRequests.map((row) => (
                  <tr key={row.user_id} className="hover:bg-ui-gray/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-primary">
                      {row.pharmacy ? row.pharmacy.name_ar : row.full_name}
                    </td>
                    <td className="px-6 py-4 text-content-light font-medium">{row.email}</td>
                    <td className="px-6 py-4 text-content-light">{row.phone || "لا يوجد"}</td>
                    <td className="px-6 py-4 text-content-light">{row.location || "لا يوجد"}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">{getStatusBadge(row)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenReview(row)}
                        className="flex items-center gap-2 px-4 py-1.5 border border-primary/20 text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-bold mx-auto"
                      >
                        <VisibilityIcon className="!text-[18px]" />
                        مراجعة
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Modal */}
      {openModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ui-bg/60 backdrop-blur-sm">
          <div className="bg-ui-card w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-border">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-ui-border flex justify-between items-center bg-ui-card">
              <h3 className="text-xl font-bold text-text">مراجعة طلب الترخيص والاعتماد</h3>
              {getStatusBadge(selectedRequest)}
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface-alt p-6 rounded-2xl border border-border col-span-2">
                  <h4 className="font-bold text-content-main mb-3 border-r-4 border-primary pr-2 leading-none">
                    بيانات حساب الصيدلاني مقدم الطلب
                  </h4>
                  <div className="space-y-2 text-sm text-content-light font-medium">
                    <p>
                      <span className="text-content-main">الاسم بالكامل:</span>{" "}
                      {selectedRequest.full_name}
                    </p>
                    <p>
                      <span className="text-content-main">البريد الإلكتروني:</span>{" "}
                      {selectedRequest.email}
                    </p>
                    <p>
                      <span className="text-content-main">رقم الهاتف:</span> {selectedRequest.phone}
                    </p>
                    <p>
                      <span className="text-content-main">الصيدلية التابعة له:</span>{" "}
                      {selectedRequest.pharmacy
                        ? selectedRequest.pharmacy.name_ar
                        : "جاري إنشاء الصيدلية تزامناً"}
                    </p>
                  </div>
                </div>

                {/*   */}
                {!selectedRequest.is_active &&
                  !selectedRequest.reject_reason &&
                  !selectedRequest.reason &&
                  selectedTab === "pending" && (
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-bold text-content-main mb-2">
                        سبب الرفض (إلزامي عند الرفض)
                      </label>
                      <textarea
                        className={`w-full p-4 border rounded-2xl outline-none min-h-[100px] text-sm font-medium bg-ui-card text-content-main resize-none transition-all ${
                          rejectError
                            ? "border-status-error ring-status-error/20"
                            : "border-border focus:border-primary focus:ring-primary/20"
                        }`}
                        placeholder="اكتب سبب الرفض هنا ليتم إعلام الصيدلي..."
                        value={rejectReason}
                        onChange={(e) => {
                          setRejectReason(e.target.value);
                          if (e.target.value.trim()) setRejectError(false);
                        }}
                      />
                      {rejectError && (
                        <p className="text-status-error text-xs mt-2 font-bold">
                          يرجى كتابة سبب الرفض
                        </p>
                      )}
                    </div>
                  )}

                {/*      */}
                {(selectedRequest.reject_reason || selectedRequest.reason) && (
                  <div className="col-span-1 md:col-span-2 bg-status-error/5 p-4 rounded-xl border border-status-error/20">
                    <p className="text-status-error font-bold text-sm">
                      سبب الرفض الحالي المتوفر بالنظام:
                    </p>
                    <p className="text-content-main text-sm mt-1">
                      {selectedRequest.reject_reason || selectedRequest.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 pt-4 border-t border-ui-border">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 py-3 text-text-light font-bold hover:bg-ui-gray rounded-xl transition-colors border border-ui-border"
                >
                  إغلاق
                </button>

                {/*         */}
                {!selectedRequest.is_active && (
                  <>
                    {/* ( )*/}
                    {!selectedRequest.reject_reason && !selectedRequest.reason && (
                      <button
                        onClick={handleReject}
                        className="flex-1 py-3 bg-status-error/10 text-status-error rounded-xl font-bold hover:bg-status-error hover:text-white transition-all flex items-center justify-center gap-2 border border-status-error/20"
                      >
                        <CancelIcon className="!text-[20px]" />
                        رفض الطلب
                      </button>
                    )}

                    {/*      */}
                    <button
                      onClick={handleApprove}
                      className="flex-1 py-3 bg-status-success text-white rounded-xl font-bold hover:bg-status-success/90 shadow-lg shadow-status-success/20 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircleIcon className="!text-[20px]" />
                      اعتماد وتفعيل
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Approvals;

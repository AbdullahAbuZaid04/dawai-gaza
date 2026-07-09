import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import ConfirmDialog from "../../components/common/ConfirmDialog";

function Bulletins() {
  const [bulletins, setBulletins] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal",
  });

  const token = localStorage.getItem("token");
  const config = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  const fetchBulletins = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/promotions?type=circular`, config);
      setBulletins(res.data);
    } catch (err) {
      console.error("خطأ في  التعاميم", err);
    }
  }, [config]);

  useEffect(() => {
    fetchBulletins();
  }, [fetchBulletins]);

  const handlePublish = async () => {
    if (!formData.title || !formData.content) {
      console.error("يرجى تعبئة العنوان والنص");
      return;
    }

    try {
      const dataToSend = {
        title: formData.title,
        description: formData.content,
        priority: formData.priority,
        is_active: true,
        start_date: new Date().toISOString().split("T")[0],
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          .toISOString()
          .split("T")[0],
      };

      await axios.post(`${API_BASE_URL}/promotions`, dataToSend, config);

      await fetchBulletins();
      setOpenAddModal(false);
      setFormData({ title: "", content: "", priority: "" });
    } catch (err) {
      console.error("خطأ في النشر:", err.response ? err.response.data : err);
      alert("فشل النشر، تأكد من تعبئة جميع الحقول المطلوبة ");
    }
  };

  const handleEdit = async () => {
    try {
      const dataToSend = {
        title: formData.title,
        description: formData.content,
        priority: formData.priority,
      };

      await axios.put(`${API_BASE_URL}/promotions/${selectedId}`, dataToSend, config);
      await fetchBulletins();
      setOpenEditModal(false);
    } catch (err) {
      console.error("خطأ في التعديل", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/promotions/${selectedId}`, config);
      setBulletins(bulletins.filter((b) => b.id !== selectedId));
      setOpenDeleteModal(false);
    } catch (err) {
      console.error("خطأ في الحذف", err);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="bg-status-error/10 text-status-error px-3 py-1 rounded-full text-[10px] font-bold">
            عاجل
          </span>
        );
      case "info":
        return (
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold">
            معلومات
          </span>
        );
      default:
        return (
          <span className="bg-ui-gray text-content-light px-3 py-1 rounded-full text-[10px] font-bold border border-ui-border">
            عادي
          </span>
        );
    }
  };

  const selectedBulletin = bulletins.find((b) => b.id === selectedId);

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-content-main flex items-center gap-3">
            التعاميم الرسمية
          </h1>
          <p className="text-content-light mt-2 font-medium">
            إدارة ونشر كافة التعليمات والنشرات الطبية لصيادلة النقابة
          </p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="px-6 py-3 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center gap-2"
          aria-label="إضافة تعميم جديد"
        >
          <Plus className="w-5 h-5" />
          إضافة تعميم جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bulletins.map((item) => (
          <div
            key={item.id}
            className="group bg-ui-card p-6 rounded-xl shadow-sm border border-ui-border hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                {getPriorityBadge(item.priority)}
                <span className="text-[11px] text-content-light font-medium">{item.end_date}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedId(item.id);
                    setFormData({
                      title: item.title,
                      content: item.description,
                      priority: item.priority,
                    });
                    setOpenEditModal(true);
                  }}
                  className="p-1.5 text-content-light hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  aria-label={`تعديل التعميم ${item.title}`}
                >
                  <Edit className="w-[18px] h-[18px]" />
                </button>
                <button
                  onClick={() => {
                    setSelectedId(item.id);
                    setOpenDeleteModal(true);
                  }}
                  className="p-1.5 text-content-light hover:text-status-error hover:bg-status-error/10 rounded-lg transition-all"
                  aria-label={`حذف التعميم ${item.title}`}
                >
                  <Trash2 className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-content-main mb-3">{item.title}</h3>
            <p className="text-content-light text-sm leading-relaxed mb-6 flex-grow">
              {item.description}
            </p>
            <button
              className="text-primary text-xs font-black flex items-center gap-1 hover:underline mt-auto"
              onClick={() => {
                setSelectedId(item.id);
                setFormData({
                  title: item.title,
                  content: item.description,
                  priority: item.priority,
                });
                setOpenEditModal(true);
              }}
              aria-label={`عرض تفاصيل التعميم ${item.title}`}
            >
              تفاصيل التعميم
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(openAddModal || openEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-ui-card w-full max-w-xl rounded-xl shadow-xl overflow-hidden border border-ui-border">
            <div className="px-8 py-6 border-b border-ui-border flex items-center gap-3 bg-ui-card/30">
              <h3 className="text-xl font-bold text-content-main">
                {openAddModal ? "نشر تعميم جديد" : "تعديل التعميم"}
              </h3>
            </div>
            <div className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-content-main mb-2">
                  عنوان التعميم
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-ui-card border border-ui-border rounded-xl focus:border-primary outline-none text-sm font-medium text-content-main placeholder-content-light/50"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-content-main mb-2">الأهمية</label>
                <select
                  className="w-full px-4 py-3 bg-ui-card border border-ui-border rounded-xl focus:border-primary outline-none text-sm font-medium text-content-main"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="normal">عادي</option>
                  <option value="urgent">عاجل</option>
                  <option value="info">معلومات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-content-main mb-2">
                  نص التعميم
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 bg-ui-card border border-ui-border rounded-xl focus:border-primary outline-none text-sm font-medium text-content-main placeholder-content-light/50 resize-none"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <div className="flex gap-4 pt-4 border-t border-ui-border mt-4">
                <button
                  onClick={() => {
                    setFormData({ title: "", content: "", priority: "normal" });
                    setOpenAddModal(false);
                    setOpenEditModal(false);
                  }}
                  className="flex-1 py-3 text-content-light font-bold hover:bg-ui-gray rounded-xl transition-colors border border-ui-border"
                >
                  إلغاء
                </button>
                <button
                  onClick={openAddModal ? handlePublish : handleEdit}
                  disabled={!formData.title || !formData.content}
                  className="flex-1 py-3 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {openAddModal ? "نشر الآن" : "حفظ التغييرات"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        title="حذف التعميم"
        message={`هل أنت متأكد من حذف "${selectedBulletin?.title}"؟`}
        confirmText="نعم، احذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  );
}

export default Bulletins;

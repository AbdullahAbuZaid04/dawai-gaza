import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { Plus, Search } from "lucide-react";

import PageHeader from "../../components/pharmacist/PageHeader";
import InventoryTable from "../../components/pharmacist/InventoryTable";
import AddMedicineModal from "../../components/pharmacist/AddMedicineModal";
import EditMedicineModal from "../../components/pharmacist/EditMedicineModal";
import DeleteConfirmModal from "../../components/pharmacist/DeleteConfirmModal";

function Inventory() {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const [availableMedicines, setAvailableMedicines] = useState([]);

  const [formData, setFormData] = useState({
    medicine_id: "",
    name_ar: "",
    price: "",
    quantity: "",
    expiry_date: "",
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const config = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);
  const pharmacyId = user?.pharmacy_id || user?.pharmacyId;

  const fetchInventory = useCallback(async () => {
    if (!pharmacyId) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/pharmacies/${pharmacyId}/inventory`, config);
      const data = res.data.inventory || [];
      setMedicines(data);
      setAllMedicines(data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    } finally {
      setLoading(false);
    }
  }, [pharmacyId, config]);

  useEffect(() => {
    fetchInventory();
  }, [user, fetchInventory]);

  const handleSearch = (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
    if (term === "") {
      setMedicines(allMedicines);
    } else {
      const filtered = allMedicines.filter((m) => {
        return m.medicine.name_ar && m.medicine.name_ar.includes(term);
      });
      setMedicines(filtered);
    }
  };

  const openAddModal = async () => {
    setError("");
    try {
      const res = await axios.get(`${API_BASE_URL}/medicines`, config);
      setAvailableMedicines(res.data.data || res.data || []);
      setFormData({ medicine_id: "", price: "", quantity: "", expiry_date: "" });
      setShowAddModal(true);
    } catch (err) {
      setError("تعذر تحميل قائمة الأدوية.");
    }
  };

  const openEditModal = (medicine) => {
    setError("");
    setEditingMedicine(medicine);

    setFormData({
      medicine_id: medicine.medicine_id,
      name_ar: medicine.medicine.name_ar,
      price: medicine.price_ils,
      quantity: medicine.quantity,
      expiry_date: medicine.expiry_date,
    });
    setShowEditModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        pharmacy_id: pharmacyId,
        medicine_id: formData.medicine_id,
        quantity: parseInt(formData.quantity),
        price_ils: parseFloat(formData.price),
        expiry_date: formData.expiry_date,
      };

      await axios.post(`${API_BASE_URL}/pharmacies/${pharmacyId}/inventory`, payload, config);

      setShowAddModal(false);
      fetchInventory();
    } catch (err) {
      if (err.response && err.response.data) {
        console.error(" خطأ  :", err.response.data);
        setError(err.response.data.message || "خطأ    ");
      } else {
        setError("فشل الاتصال بالسيرفر.");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatePayload = {
      quantity: parseInt(formData.quantity),
      price_ils: parseFloat(formData.price),
      expiry_date: formData.expiry_date,
    };

    try {
      await axios.put(
        `${API_BASE_URL}/inventory/${editingMedicine.inventory_id}`,
        updatePayload,
        config
      );
      setShowEditModal(false);
      fetchInventory();
    } catch (err) {
      console.error("خطأ التعديل:", err.response?.data);
    }
  };

  const handleDelete = async () => {
    if (!medicineToDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/inventory/${medicineToDelete.inventory_id}`, config);

      setShowDeleteModal(false);
      setMedicineToDelete(null);
      fetchInventory();
    } catch (err) {
      console.error("خطأ أثناء الحذف:", err.response?.data || err.message);
    }
  };

  if (loading) return <div className="p-12 text-center">جاري تحميل المخزون...</div>;

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      <PageHeader
        title="إدارة المخزون"
        description="أضف أو عدّل مخزون الأدوية وتأكد من تحديث الأسعار والكميات."
        actionButton={
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 transition flex items-center gap-2 active:scale-95 shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            إضافة دواء جديد
          </button>
        }
      />

      <div className="bg-ui-card rounded-2xl p-6 shadow-sm border border-ui-border mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full md:w-96 text-right">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-content-light font-bold w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن اسم الدواء..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pr-12 pl-4 py-3 bg-ui-bg/50 border border-ui-border rounded-xl transition text-sm font-bold text-content-main"
            />
          </div>
          <div className="text-sm text-content-light font-bold">
            العدد: {medicines.length} صنف مسجل
          </div>
        </div>

        <InventoryTable
          medicines={medicines}
          onEdit={openEditModal}
          onDelete={(m) => {
            setMedicineToDelete(m);
            setShowDeleteModal(true);
          }}
        />
      </div>

      <AddMedicineModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        formData={formData}
        setFormData={setFormData}
        medicinesList={availableMedicines}
        error={error}
      />

      <EditMedicineModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        formData={formData}
        setFormData={setFormData}
        error={error}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="تأكيد حذف الدواء"
        message={`هل أنت متأكد من رغبتك في حذف ${medicineToDelete?.medicine?.name_ar || medicineToDelete?.name_ar || "هذا الدواء"}؟`}
      />
    </div>
  );
}

export default Inventory;

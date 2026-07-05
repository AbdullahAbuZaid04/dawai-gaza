import React from "react";

const AddMedicineModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  medicinesList,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-ui-card w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-ui-border shadow-2xl relative">
        <h3 className="text-xl sm:text-2xl font-black text-content-main mb-6">إضافة دواء جديد</h3>

        {error && (
          <div className="mb-6 p-4 bg-status-error/5 text-status-error rounded-xl text-sm font-bold border border-status-error/10">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/*     */}
          <div>
            <label className="block text-xs font-black text-content-light mb-1">
              اختر الدواء من القائمة
            </label>
            <select
              required
              className="w-full px-4 py-3 bg-ui-bg/25 border border-ui-border rounded-xl focus:border-primary outline-none transition font-bold"
              value={formData.medicine_id || ""}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedMedicine = medicinesList.find(
                  (m) => m.medicine_id === Number(selectedId)
                );

                setFormData({
                  ...formData,
                  medicine_id: selectedId,
                  name_ar: selectedMedicine ? selectedMedicine.name_ar : "",
                });
              }}
            >
              <option value="">اختر الدواء...</option>
              {medicinesList?.map((m) => (
                <option key={m.medicine_id} value={m.medicine_id}>
                  {m.name_ar} - {m.strength}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-content-light mb-1">
                السعر (شيكل)
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.5"
                className="w-full px-4 py-3 bg-ui-bg/25 border border-ui-border rounded-xl focus:border-primary outline-none transition font-bold"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-content-light mb-1">
                الكمية الحالية
              </label>
              <input
                required
                type="number"
                min="0"
                className="w-full px-4 py-3 bg-ui-bg/25 border border-ui-border rounded-xl focus:border-primary outline-none transition font-bold"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-content-light mb-1">
              الصلاحية لغاية
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-ui-bg/25 border border-ui-border rounded-xl focus:border-primary outline-none transition font-bold"
              value={formData.expiry_date}
              onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
            />
          </div>

          {/* الأزرار */}
          <div className="flex gap-4 mt-8 pt-4 border-t border-ui-border">
            <button
              type="submit"
              className="flex-1 bg-primary text-content-white py-3 rounded-xl font-bold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary/20"
            >
              إضافة
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-ui-border text-content-main py-3 rounded-xl font-bold hover:bg-ui-gray transition"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;

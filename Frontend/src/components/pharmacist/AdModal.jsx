const AdModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-ui-card w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-ui-border shadow-2xl relative">
        <h3 className="text-xl sm:text-2xl font-black text-content-main mb-6">نشر إعلان جديد</h3>

        <form onSubmit={onSubmit} className="space-y-4 text-right" dir="rtl">
          <div>
            <label className="block text-xs font-black text-content-light mb-1">
              عنوان الإعلان
            </label>
            <input
              required
              placeholder="مثال: خصم على منتجات العناية بالبشرة"
              className="w-full px-4 py-3 bg-ui-bg/25 border border-ui-border rounded-xl focus:border-primary outline-none transition font-bold text-content-main placeholder:text-content-light/50"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-content-light mb-1">
              قيمة الخصم (اختياري)
            </label>
            <input
              placeholder="مثال: 20"
              className="w-full px-4 py-3 bg-ui-bg/25 border border-ui-border rounded-xl focus:border-primary outline-none transition font-bold text-content-main placeholder:text-content-light/50"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            />
          </div>

          <div>
            <label>تاريخ البدء</label>
            <input
              type="date"
              required
              value={formData.start_date || ""}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
          </div>

          {/* حقل تاريخ الانتهاء */}
          <div>
            <label>تاريخ الانتهاء</label>
            <input
              type="date"
              required
              value={formData.end_date || ""}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-content-light mb-1">التفاصيل</label>
            <textarea
              required
              rows="4"
              placeholder="اكتب تفاصيل العرض أو الإعلان..."
              className="w-full px-4 py-3 bg-ui-bg/25 border border-ui-border rounded-xl focus:border-primary outline-none transition font-bold text-content-main placeholder:text-content-light/50 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-content-light mb-2">صورة الإعلان</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-content-main file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer border border-ui-border rounded-xl p-2 bg-ui-bg/25"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, imageUrl: reader.result, imageFile: file });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {formData.imageUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={formData.imageUrl}
                  alt="preview"
                  className="h-24 rounded-lg shadow-sm border border-ui-border"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8 pt-4 border-t border-ui-border">
            <button
              type="submit"
              className="flex-1 bg-primary text-content-white py-3 rounded-xl font-bold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary/20"
            >
              نشر الآن
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

export default AdModal;

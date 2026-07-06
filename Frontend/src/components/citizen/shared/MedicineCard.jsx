import { MapPin, Eye, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MedicineCard({ item, tinted = false }) {
  const navigate = useNavigate();

  return (
    <div
      className={`group w-full ${tinted ? "bg-ui-gray" : "bg-ui-card"}  rounded-2xl border border-ui-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-500 `}
    >
      <div className="p-6">
        {/* السعر والنوع */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-xs font-bold">
            {item.medicine.dosage_form || "دواء"}
          </span>
          <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-xl text-primary font-bold text-sm">
            {item.price_ils || item.medicine?.price || item.price} ₪
          </div>
        </div>

        {/* اسم الدواء */}
        <h3 className="text-lg font-bold text-content-main min-h-[4rem]">
          {item.medicine.name_ar}
        </h3>

        {/* معلومات الصيدلية */}
        <div className="space-y-3 mb-4">
          <div>
            <p className="text-sm font-bold text-content-light truncate">{item.pharmacy?.name_ar || item.pharmacy_name}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="text-content-light" size={14} />
              <span className="text-xs text-content-light truncate">{item.pharmacy?.location || item.location}</span>
            </div>
          </div>

          {/* حالة التوفر */}
          <div className="flex items-center gap-2 ">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${item.quantity > 0 ? "bg-status-success" : "bg-status-error"}`}
            />
            <span
              className={`text-xs font-bold ${item.quantity > 0 ? "text-status-success" : "text-status-error"}`}
            >
              {item.quantity > 0 ? "متوفر الآن" : "غير متوفر"}
            </span>
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex gap-2 pt-4 border-t border-ui-border">
          <button
            onClick={() => navigate(`/medicine/${item.pharmacy?.id || item.pharmacy_id}/${item.medicine?.id || item.medicine_id}`)}
            aria-label={`عرض تفاصيل دواء ${item.medicine?.name_ar || item.name_ar}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-ui-border text-content-light rounded-xl text-xs font-bold hover:bg-ui-gray hover:text-primary hover:border-primary/20 transition-all"
          >
            <Eye size={14} aria-hidden="true" />
            <span>تفاصيل</span>
          </button>
          <button
            onClick={() => navigate(`/pharmacy/${item.pharmacy?.id || item.pharmacy_id}`)}
            aria-label={`الانتقال إلى صيدلية ${item.pharmacy?.name_ar || item.pharmacy_name || ""}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-content-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-700 transition-all"
          >
            <Pill size={14} aria-hidden="true" />
            <span>الصيدلية</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicineCard;

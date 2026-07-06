import { Pill, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MedicineInventory({ pharmacyId, searchTerm, onSearchChange, medicines }) {
  const navigate = useNavigate();

  return (
    <div key="meds">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-content-main mb-2">مخزون الأدوية</h2>
          <p className="text-content-light font-bold">ابحث عن الدواء المطلوب داخل هذه الصيدلية</p>
        </div>

        <div className="w-full md:w-80 relative group">
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-content-light group-focus-within:text-primary transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="اسم الدواء مثل بنادول..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-12 pl-4 py-4 rounded-2xl bg-ui-card border border-ui-border focus:outline-none focus:border-primary transition-all font-bold text-content-main shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {medicines.map((med) => (
          <div
            key={med.id}
            onClick={() => navigate(`/medicine/${pharmacyId}/${med.medicine_id}`)}
            className="med-card p-6 rounded-2xl bg-ui-card border border-ui-border hover:shadow-2xl hover:border-primary transition-all duration-500 cursor-pointer flex items-center justify-between group overflow-hidden relative"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Pill size={24} />
              </div>
              <div className="flex flex-col">
                <h4 className="font-black text-content-main text-lg group-hover:text-primary transition-colors leading-tight mb-2">
                  {med.medicine?.name_ar || med.name_ar || med.nameAr}
                </h4>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-xl text-[10px] font-black tracking-widest uppercase ${med.available ? "bg-status-success/10 text-status-success" : "bg-status-error/10 text-status-error"}`}
                  >
                    {(med.available ?? med.stock_status === "In Stock") ? "متوفر" : "غير متوفر"}
                  </span>
                  <span className="text-xs font-bold text-content-light/60">{med.medicine?.dosage_form || med.dosage_form}</span>
                </div>
              </div>
            </div>

            <div className="text-right relative z-10">
              <span className="text-2xl font-black text-primary inline-block">{med.medicine?.price ?? med.price}</span>
              <span className="text-sm font-black text-primary mr-1">₪</span>
            </div>
          </div>
        ))}
        {medicines.length === 0 && (
          <div className="col-span-full py-20 text-center bg-ui-card rounded-2xl border-2 border-dashed border-ui-border">
            <p className="text-content-main font-bold">عذراً، لم نجد نتائج لـ "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicineInventory;

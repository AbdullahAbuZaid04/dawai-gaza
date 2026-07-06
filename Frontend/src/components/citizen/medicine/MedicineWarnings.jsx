import { AlertTriangle, HelpCircle, ChevronLeft } from "lucide-react";

function MedicineWarnings({ medicine }) {
  const warnings = medicine.leaflet_side_effects ? medicine.leaflet_side_effects.split("\n") : [];
  const directions = medicine.leaflet_contraindications
    ? medicine.leaflet_contraindications.split("\n")
    : [];

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Warnings */}
      <section className="detail-item p-6 rounded-2xl bg-status-error/5 border border-status-error/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-status-error/10 flex items-center justify-center text-status-error">
            <AlertTriangle size={20} />
          </div>
          <h3 className="text-xl font-black text-content-main">تحذيرات هامة</h3>
        </div>

        <ul className="space-y-4 text-content-light font-medium mr-4">
          {warnings.map((warning, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-status-error font-bold">•</span>
              {warning}
            </li>
          ))}
        </ul>
      </section>

      {/* Directions */}
      <section className="detail-item p-6 rounded-2xl bg-primary/5 border border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <HelpCircle size={20} />
          </div>
          <h3 className="text-xl font-black text-content-main">توجيهات إضافية</h3>
        </div>

        <ul className="space-y-4 text-content-light font-medium mr-2">
          {directions.map((direction, idx) => (
            <li key={idx} className="flex gap-2 text-primary font-bold">
              <ChevronLeft size={18} className="shrink-0" />
              {direction}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MedicineWarnings;

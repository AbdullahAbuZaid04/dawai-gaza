import { Package } from "lucide-react";

const LowStockList = ({ lowStockItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lowStockItems.length > 0 ? (
        lowStockItems.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-xl border border-ui-border flex justify-between items-center hover:bg-ui-gray/50 hover:border-primary transition-colors duration-300"
          >
            <div className="flex gap-4 items-center">
              <div className="font-bold text-content-main">{m.medicine.name_ar}</div>
            </div>
            <div className="text-left font-bold text-status-error flex items-center gap-2">
              <span className="px-3 py-1 bg-status-error/10 rounded-lg">متبقي {m.quantity}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-content-main font-bold flex flex-col items-center col-span-full bg-ui-card rounded-2xl border border-dashed border-ui-border">
          <div className="w-16 h-16 bg-ui-card rounded-full flex items-center justify-center mb-4 border border-dashed border-ui-border">
            <Package className="w-8 h-8 text-content-light" />
          </div>
          لا توجد أدوية منخفضة المخزون
        </div>
      )}
    </div>
  );
};

export default LowStockList;

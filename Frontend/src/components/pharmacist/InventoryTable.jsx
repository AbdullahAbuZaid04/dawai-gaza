import { Edit, Trash2 } from "lucide-react";

const InventoryTable = ({ medicines, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto border border-ui-border rounded-xl">
      <table className="w-full text-right align-middle whitespace-nowrap">
        <thead>
          <tr className="bg-ui-gray/50 border-b border-ui-border text-xs uppercase text-content-light">
            <th scope="col" className="px-6 py-4 font-black w-1/3">اسم الدواء</th>
            <th scope="col" className="px-6 py-4 font-black">السعر (₪)</th>
            <th scope="col" className="px-6 py-4 font-black">الكمية</th>
            <th scope="col" className="px-6 py-4 font-black text-center">تاريخ الصلاحية</th>
            <th scope="col" className="px-6 py-4 font-black text-center w-24">إجراء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ui-border bg-ui-card text-content-main text-sm">
          {medicines.map((item) => (
            <tr key={item.id} className="hover:bg-ui-gray/20 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold">{item.medicine.name_ar}</div>
              </td>
              <td className="px-6 py-4 font-bold">{item.price_ils} شيكل</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-bold ${item.quantity <= 10 ? "bg-status-error/10 text-status-error" : "bg-status-success/10 text-status-success"}`}
                >
                  {item.quantity}
                </span>
              </td>
              <td className="px-6 py-4 text-center text-content-light">
                {item.expiry_date || "غير محدد"}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(item)}
                    aria-label={`تعديل ${item.medicine.name_ar}`}
                    className="p-2 rounded-lg text-primary hover:bg-primary/10 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    aria-label={`حذف ${item.medicine.name_ar}`}
                    className="p-2 rounded-lg text-status-error hover:bg-status-error/10 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {medicines.length === 0 && (
            <tr>
              <td colSpan="5" className="p-8 text-center text-content-light font-bold">
                لم يتم العثور على أدوية.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;

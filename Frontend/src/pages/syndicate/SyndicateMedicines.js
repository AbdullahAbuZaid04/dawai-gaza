import { useState, useEffect } from "react";
import { Search, Package } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function SyndicateMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        setMedicines(response.data || []);
      } catch (error) {
        console.error("خطأ    :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filteredMedicines = medicines.filter((item) =>
    item.name_ar?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-content-main">دليل الأدوية الشامل</h1>
        <p className="text-content-light font-medium mt-1">
          سجل الأدوية المتوفرة في جميع صيدليات الشبكة مع أسعارها وتوافرها
        </p>
      </div>

      <div className="relative w-full lg:w-96 mb-8 group">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-light group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="البحث باسم الدواء..."
          className="w-full pr-12 pl-4 py-3.5 bg-ui-card text-content-main border border-ui-border rounded-xl outline-none focus:border-primary transition-all text-sm font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-ui-card rounded-3xl shadow-sm border border-ui-border overflow-hidden">
        {loading ? (
          <div className="py-24 text-center font-bold text-content-light">
            جاري تحميل البيانات...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-ui-gray/50 border-b border-ui-border">
                <tr>
                  {["معرف التسجيل", "الصنف", "المكان (الصيدلية)", "السعر ", "الحالة"].map(
                    (head) => (
                      <th key={head} className="px-6 py-5 font-extrabold text-content-light">
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-ui-border">
                {filteredMedicines.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-24 text-center opacity-30">
                      <div className="flex flex-col items-center">
                        <Package className="w-16 h-16 mb-4" />
                        <p className="text-xl font-extrabold">لا توجد أدوية مطابقة للبحث</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMedicines.map((item, index) => (
                    <tr key={index} className="hover:bg-ui-gray/30 transition-colors group">
                      <td className="px-6 py-5 font-extrabold text-content-main font-en">
                        {item.inventory_id}
                      </td>

                      <td className="px-6 py-5">
                        <div className="font-extrabold text-content-main">{item.name_ar}</div>
                        {/*      */}
                        <div className="text-[10px] text-content-light font-bold mt-0.5">
                          {item.dosage_form}
                        </div>
                      </td>

                      <td className="px-6 py-5 font-extrabold text-primary">
                        {item.pharmacy_name}
                        <div className="text-[10px] text-content-light font-bold mt-0.5">
                          {item.location}
                        </div>
                      </td>

                      <td className="px-6 py-5 font-black text-primary">{item.price} ₪</td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                            item.stock_status === "In Stock"
                              ? "bg-status-success/10 text-status-success border-status-success/20"
                              : "bg-status-error/10 text-status-error border-status-error/20"
                          }`}
                        >
                          {item.stock_status === "In Stock" ? "متوفر" : "نفذت الكمية"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SyndicateMedicines;

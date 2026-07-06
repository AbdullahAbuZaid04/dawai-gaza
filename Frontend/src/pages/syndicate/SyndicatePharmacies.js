import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business"; //
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"; //
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUserOutlined";
import MailIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { formatTimeRangeArabic } from "../../utils/time";

import axios from "axios";
import API_BASE_URL from "../../config/api";

function SyndicatePharmacies() {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pharmacies`);
        setPharmacies(response.data || []);
      } catch (error) {
        console.error("خطأ في  الصيدليات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  const filteredPharmacies = pharmacies.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full min-h-screen bg-ui-gray text-right" dir="rtl">
      {}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-content-main">إجمالي الصيدليات</h1>
        <p className="text-content-light font-medium mt-1">
          إدارة كافة الصيدليات المسجلة والمعتمدة في لوحة النقابة
        </p>
      </div>

      <div className="relative w-full lg:w-96 mb-8 group">
        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-light" />
        <input
          type="text"
          placeholder="البحث باسم الصيدلية أو الموقع..."
          className="w-full pr-12 pl-4 py-3.5 bg-ui-card text-content-main border border-ui-border rounded-xl outline-none focus:border-primary transition-all text-sm font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-20 font-bold text-content-light">جاري تحميل البيانات...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="bg-ui-card rounded-2xl border border-ui-border p-6 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-primary/50 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <BusinessIcon />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-content-main flex items-center gap-2">
                      {pharmacy.name} {/*   */}
                      {pharmacy.is_active && (
                        <VerifiedUserIcon className="w-4 h-4 text-status-success" />
                      )}
                    </h3>
                    <p className="text-xs font-bold text-content-light mt-1"> {pharmacy.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-content-light">
                  <LocationOnIcon className="w-4 h-4 text-primary/70" />
                  <span className="text-sm font-bold">{pharmacy.location}</span>
                </div>
                <div className="flex items-center gap-3 text-content-light">
                  <PhoneIcon className="w-4 h-4 text-primary/70" />
                  <span className="text-sm font-bold">{pharmacy.phone || "غير متوفر"}</span>
                </div>
                <div className="flex items-center gap-3 text-content-light">
                  <MailIcon className="w-4 h-4 text-primary/70" />
                  <span className="text-sm font-bold">{pharmacy.email || "غير متوفر"}</span>
                </div>

                <hr></hr>
                <div className="flex items-center gap-3 text-content-light">
                  <AccessTimeOutlinedIcon className="w-4 h-4 text-primary/70" />
                  <span className="text-sm font-bold">
                    {"ساعات العمل : "}
                    {formatTimeRangeArabic(pharmacy.open_time, pharmacy.close_time)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SyndicatePharmacies;

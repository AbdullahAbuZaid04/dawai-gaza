import { Phone, Mail, MapPin, Clock } from "lucide-react";
import InfoStatsCard from "../../common/InfoStatsCard";
import { formatTimeRangeArabic } from "../../../utils/time";

function ContactSection({ pharmacy }) {
  return (
    <div key="contact">
      <h2 className="text-2xl md:text-2xl font-black text-content-main mb-10">
        معلومات التواصل والدوام
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoStatsCard
          icon={<Phone size={24} />}
          label="رقم الهاتف"
          value={pharmacy.phone}
          color="#10b981"
        />
        <InfoStatsCard
          icon={<Mail size={24} />}
          label="البريد الإلكتروني"
          value={pharmacy.email}
          color="#3b82f6"
        />
        <InfoStatsCard
          icon={<MapPin size={24} />}
          label="الموقع الجغرافي"
          value={pharmacy.location}
          color="#ef4444"
        />
        <InfoStatsCard
          icon={<Clock size={24} />}
          label="أوقات الدوام"
          value={formatTimeRangeArabic(pharmacy.open_time, pharmacy.close_time)}

          color="#f59e0b"
        />
      </div>
    </div>
  );
}

export default ContactSection;

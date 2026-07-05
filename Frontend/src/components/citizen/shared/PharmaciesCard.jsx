import { MapPin, Eye, Phone, Clock, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PharmaciesCard({ pharmacy, tinted = false }) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full ${tinted ? "bg-ui-card" : "bg-ui-gray"} rounded-xl border border-ui-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-500`}
    >
      <div className="p-6">
        {/* اسم الصيدلية */}
        <h3 className="text-lg font-bold text-content-main mb-4 truncate">{pharmacy.name}</h3>

        {/* التفاصيل */}
        <div className="space-y-3 border-y-2 border-ui-border py-4 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="text-content-light" size={16} />
            <p className="text-sm text-content-light leading-relaxed">{pharmacy.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-content-light" size={16} />
            <p className="text-sm text-content-light" dir="ltr">
              {pharmacy.connect.phoneNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-content-light" size={16} />
            <p className="text-sm text-content-light">
              {`${pharmacy.working.open} - ${pharmacy.working.close}`}
            </p>
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                `https://www.google.com/maps?q=${pharmacy.lat},${pharmacy.lng}`,
                "_blank"
              );
            }}
            aria-label={`عرض موقع ${pharmacy.name} على الخريطة`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-ui-border text-content-light rounded-xl text-xs font-bold hover:text-primary hover:border-primary/20 transition-all"
          >
            <Navigation size={14} aria-hidden="true" />
            <span>الموقع</span>
          </button>
          <button
            onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
            aria-label={`تصفح صيدلية ${pharmacy.name}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-content-white rounded-xl text-xs font-bold hover:bg-primary-700 transition-all"
          >
            <Eye size={14} aria-hidden="true" />
            <span>تفاصيل</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PharmaciesCard;

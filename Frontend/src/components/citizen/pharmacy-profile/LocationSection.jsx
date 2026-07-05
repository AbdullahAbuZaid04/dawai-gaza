import { MapPin, Navigation } from "lucide-react";
import MainButton from "../../../components/common/MainButton";

function LocationSection({ pharmacy }) {
  return (
    <div key="map">
      <h2 className="text-3xl md:text-5xl font-black text-content-main mb-10">موقع الصيدلية</h2>
      <div className="bg-ui-card p-4 rounded-2xl border border-dashed border-primary overflow-hidden">
        <div className="h-80 md:h-[400px] bg-ui-gray rounded-xl overflow-hidden relative">
          {pharmacy.mapEmbed ? (
            <iframe
              src={pharmacy.mapEmbed}
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={pharmacy.name}
            ></iframe>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-content-light">
              <MapPin size={120} className="mb-6 animate-bounce" />
              <span className="text-lg font-black">خريطة تفاعلية قيد الإنشاء</span>
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-right">
            <span className="block text-[10px] font-black text-content-light uppercase tracking-widest mb-1">
              الإحداثيات
            </span>
            <span className="text-sm font-black text-content-main">
              {pharmacy.lat}, {pharmacy.lng}
            </span>
          </div>
          <MainButton
            variant="contained"
            size="small"
            href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`}
            target="_blank"
            className="w-full md:w-auto flex items-center gap-4 py-6 px-10 rounded-2xl shadow-xl shadow-primary/20 transition-all group"
          >
            <Navigation size={22} className="group-hover:rotate-12 transition-transform" />
            فتح في خرائط جوجل
          </MainButton>
        </div>
      </div>
    </div>
  );
}

export default LocationSection;

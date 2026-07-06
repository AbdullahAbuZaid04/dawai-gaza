import { MapPin, Navigation } from "lucide-react";
import MapComponent from "../../common/MapComponent";

function LocationSection({ pharmacy }) {
  const hasCoords = pharmacy.lat && pharmacy.lng;

  const marker = hasCoords
    ? [
        {
          id: pharmacy.id || "pharmacy",
          lat: pharmacy.lat,
          lng: pharmacy.lng,
          name: pharmacy.name || pharmacy.name_ar,
          address: pharmacy.location || pharmacy.address_note,
          phone: pharmacy.phone,
        },
      ]
    : [];

  const mapCenter = hasCoords ? [pharmacy.lat, pharmacy.lng] : [31.5, 34.4667];

  return (
    <div key="map">
      <h2 className="text-3xl md:text-5xl font-black text-content-main mb-10">موقع الصيدلية</h2>
      <div className="bg-ui-card p-4 rounded-2xl border border-dashed border-primary overflow-hidden">
        <div className="h-80 md:h-[400px] bg-ui-gray rounded-xl overflow-hidden relative">
          {hasCoords ? (
            <MapComponent center={mapCenter} zoom={15} markers={marker} activeMarkerId={pharmacy.id} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-content-light">
              <MapPin size={120} className="mb-6 animate-bounce" />
              <span className="text-lg font-black">الموقع غير محدد</span>
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-right">
            <span className="block text-[10px] font-black text-content-light uppercase tracking-widest mb-1">
              الإحداثيات
            </span>
            <span className="text-sm font-black text-content-main">
              {hasCoords ? `${pharmacy.lat}, ${pharmacy.lng}` : "غير متوفرة"}
            </span>
          </div>
          <a
            href={
              hasCoords
                ? `https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`
                : undefined
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full md:w-auto flex items-center justify-center gap-4 py-6 px-10 rounded-2xl shadow-xl shadow-primary/20 transition-all group font-bold ${
              hasCoords
                ? "bg-primary text-content-white hover:bg-primary-700"
                : "bg-ui-gray text-content-light cursor-not-allowed"
            }`}
          >
            <Navigation size={22} className="group-hover:rotate-12 transition-transform" />
            فتح في خرائط جوجل
          </a>
        </div>
      </div>
    </div>
  );
}

export default LocationSection;

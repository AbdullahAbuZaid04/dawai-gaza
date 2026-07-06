import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const activeIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const GAZA_CENTER = [31.5, 34.4667];

function MapComponent({
  center = GAZA_CENTER,
  zoom = 10,
  markers = [],
  activeMarkerId = null,
  className = "",
  style = {},
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`w-full h-full rounded-xl z-0 ${className}`}
      style={style}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => {
        if (!m.lat || !m.lng) return null;
        return (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={m.id === activeMarkerId ? activeIcon : defaultIcon}
          >
            {m.popup && (
              <Popup>
                <div dir="rtl" className="text-right font-sans text-sm leading-relaxed min-w-[160px]">
                  <strong className="block text-base mb-1">{m.name}</strong>
                  {m.address && <p className="text-gray-600 m-0">{m.address}</p>}
                  {m.phone && (
                    <p className="text-gray-500 m-0 mt-1" dir="ltr">
                      📞 {m.phone}
                    </p>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;

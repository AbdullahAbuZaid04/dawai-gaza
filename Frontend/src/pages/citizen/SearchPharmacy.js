import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import SearchPageLayout from "../../components/citizen/search/SearchPageLayout";
import PharmaciesCard from "../../components/citizen/shared/PharmaciesCard";
import MapComponent from "../../components/common/MapComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Map, List } from "lucide-react";

function SearchPharmacy() {
  const [pharmacies, setPharmacies] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const [showMap, setShowMap] = useState(false);

  const fetchPharmacies = async (searchQuery = "", pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/pharmacies`, {
        params: { search: searchQuery, page: pageNum },
      });

      const rawData = res.data.data || res.data || [];

      const formattedData = rawData.map((p) => ({
        id: p.id,
        name: p.name_ar || p.name,
        location: p.location || "الموقع غير متوفر",
        connect: { phoneNumber: p.phone || "غير متوفر" },
        working: { is24h: false, open: p.open_time, close: p.close_time },
        lat: p.lat,
        lng: p.lng,
      }));

      setPharmacies(formattedData);
      setTotalPages(res.data.last_page || Math.ceil((res.data.total || rawData.length) / 16) || 1);
      setHasSearched(searchQuery !== "");
    } catch (err) {
      console.error("خطأ في البحث:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (q) => {
    navigate(`/pharmacies?q=${encodeURIComponent(q)}&page=1`);
  };

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    setPage(1);
    fetchPharmacies(q, 1);
  }, [searchParams]);

  const mapMarkers = pharmacies
    .filter((p) => p.lat && p.lng)
    .map((p) => ({
      id: p.id,
      lat: p.lat,
      lng: p.lng,
      name: p.name,
      address: p.location,
      phone: p.connect?.phoneNumber,
    }));

  const renderPharmacyCard = (pharmacy) => (
    <div key={pharmacy.id} className="pharmacy-card-wrapper">
      <PharmaciesCard pharmacy={pharmacy} tinted={true} />
    </div>
  );

  return (
    <div className="bg-ui-gray">
      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <SearchPageLayout
          title="محرك بحث الصيدليات"
          description="ابحث عن أقرب صيدلية إليك، وتحقق من ساعات العمل والصيدليات المناوبة وتواصل معهم."
          searchPlaceholder="اسم الصيدلية أو المنطقة..."
          query={query}
          onQueryChange={(e) => {
            setQuery(e.target.value);
          }}
          onSearch={() => {
            handleSearch(query);
          }}
          hasSearched={hasSearched}
          results={pharmacies}
          resultsLabel={
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span>
                {hasSearched ? "الصيدليات الموجودة" : "كافة صيدليات قطاع غزة المعتمدة"}{" "}
                <span className="text-primary">({pharmacies.length})</span>
              </span>
              {pharmacies.length > 0 && (
                <button
                  onClick={() => setShowMap((v) => !v)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-ui-border text-sm font-bold hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  {showMap ? <List size={16} /> : <Map size={16} />}
                  {showMap ? "عرض القائمة" : "عرض الخريطة"}
                </button>
              )}
            </div>
          }
          renderItem={showMap ? () => null : renderPharmacyCard}
          extraContent={
            showMap && pharmacies.length > 0 ? (
              <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden border border-ui-border">
                <MapComponent
                  center={mapMarkers.length > 0 ? [mapMarkers[0].lat, mapMarkers[0].lng] : [31.5, 34.4667]}
                  zoom={10}
                  markers={mapMarkers}
                />
              </div>
            ) : null
          }
          emptyStateText="عذراً، لم نجد نتائج باسم"
          emptyStateSubtext="تأكد من كتابة اسم الصيدلية أو المنطقة بشكل صحيح."
          page={page}
          totalPages={totalPages}
          onPageChange={(e, p) => {
            setPage(p);
            fetchPharmacies(query, p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}

export default SearchPharmacy;

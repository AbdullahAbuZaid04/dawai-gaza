import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import SearchPageLayout from "../../components/citizen/search/SearchPageLayout";
import MedicineCard from "../../components/citizen/shared/MedicineCard";

import { useSearchParams } from "react-router-dom";

function SearchMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchMed] = useSearchParams();

  const fetchMedicines = async (searchQuery = "", pageNum = 1) => {
    setLoading(true);
    try {
      const resInventory = await axios.get(`${API_BASE_URL}/inventory`, {
        params: { search: searchQuery },
      });
      const formattedData = resInventory.data.map((item) => {
        return {
          pharmacy: {
            id: item.pharmacy_id,
            name_ar: item.pharmacy_name,
            location: item.location || "الموقع غير متوفر",
          },
          medicine: {
            id: item.medicine_id,
            name_ar: item.name_ar,
            dosage_form: item.dosage_form,
            price: item.price,
            quantity: item.quantity,
            available: item.stock_status,
          },
        };
      });

      setMedicines(formattedData);
      setTotalPages(1);
      setHasSearched(searchQuery !== "");
    } catch (err) {
      console.error("خطأ  :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = searchMed.get("q") || "";
    setQuery(q);
    fetchMedicines(q, 1);
  }, [searchMed]);

  const renderMedicineCard = (item, index) => (
    <div key={`${item.pharmacy.id}-${item.medicine.id}-${index}`} className="medicine-card-wrapper">
      <MedicineCard item={item} index={index} tinted={false} />
    </div>
  );

  void loading;
  return (
    <div className="bg-ui-gray">
      <SearchPageLayout
        title="محرك بحث الأدوية"
        description="ابحث وتعرف على أسعار وتوفر الأدوية في صيدليات قطاع غزة المعتمدة لحظة بلحظة"
        searchPlaceholder="اسم الدواء مثل بنادول..."
        query={query}
        onQueryChange={(e) => {
          setQuery(e.target.value);
        }}
        onSearch={() => {
          fetchMedicines(query, 1);
        }}
        hasSearched={hasSearched}
        results={medicines}
        resultsLabel={hasSearched ? "نتائج البحث" : "كافة الأدوية المتاحة"}
        renderItem={renderMedicineCard}
        emptyStateText="عذراً، لم نجد نتائج باسم"
        emptyStateSubtext="تأكد من كتابة اسم الدواء بشكل صحيح."
        page={page}
        totalPages={totalPages}
        onPageChange={(e, p) => {
          setPage(p);
          fetchMedicines(query, p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

export default SearchMedicine;

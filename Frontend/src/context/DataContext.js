import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { pharmacies as initialPharmacies, mockBulletins, mockAds, mockApprovals } from "../data";

const DataContext = createContext(null);

const OFFICIAL_PRICES = {
  باراسيتامول: 9,
  أموكسيسيلين: 15,
  بنادول: 10,
  "مالتي فيتامين": 30,
};

export const DataProvider = ({ children }) => {
  const [pharmacies] = useState(initialPharmacies);
  const [bulletins, setBulletins] = useState(mockBulletins);
  const [ads] = useState(mockAds);
  const [approvals, setApprovals] = useState(mockApprovals);

  const [violations, setViolations] = useState(() => {
    const detected = [];
    initialPharmacies.forEach((p) => {
      p.medicines.forEach((m) => {
        const key = (m.nameAr || "").trim();
        const official = OFFICIAL_PRICES[key];
        if (official && m.price > official) {
          detected.push({
            id: `${p.id}-${m.id}`,
            pharmacy: p.name,
            pharmacyId: p.id,
            medicine: key,
            officialPrice: official,
            soldPrice: m.price,
            date: new Date().toISOString().slice(0, 10),
            status: "new",
            location: p.location,
          });
        }
      });
    });
    return detected;
  });

  const allMedicines = useMemo(() => {
    const flattened = [];
    pharmacies.forEach((p) => {
      p.medicines.forEach((m) => {
        flattened.push({ pharmacy: p, medicine: m });
      });
    });
    return flattened;
  }, [pharmacies]);

  const addBulletin = useCallback((bulletin) => {
    setBulletins((prev) => [bulletin, ...prev]);
  }, []);

  const updateApprovalStatus = useCallback((id, status, reason = "") => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status, reason } : a)));
  }, []);

  const updateViolationStatus = useCallback((id, status) => {
    setViolations((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  }, []);

  const getPharmacyById = useCallback(
    (id) => pharmacies.find((p) => p.id === parseInt(id, 10)),
    [pharmacies]
  );

  const getMedicineById = useCallback(
    (pharmacyId, medicineId) => {
      const pharmacy = pharmacies.find((p) => p.id === parseInt(pharmacyId, 10));
      if (!pharmacy) return null;
      const medicine = pharmacy.medicines.find((m) => String(m.id) === String(medicineId));
      return medicine ? { pharmacy, medicine } : null;
    },
    [pharmacies]
  );

  const getPharmacyMedicines = useCallback(
    (pharmacyId, query = "") => {
      const pharmacy = pharmacies.find((p) => p.id === parseInt(pharmacyId, 10));
      if (!pharmacy) return [];
      const term = query.trim();
      if (!term) return pharmacy.medicines;
      return pharmacy.medicines.filter((m) => m.nameAr && m.nameAr.includes(term));
    },
    [pharmacies]
  );

  const getPharmacyOffers = useCallback(
    (pharmacyId) => ads.filter((ad) => ad.pharmacyId === parseInt(pharmacyId, 10)),
    [ads]
  );

  const searchMedicines = useCallback(
    (searchTerm) => {
      const term = (searchTerm || "").trim();
      if (!term) return allMedicines;
      return allMedicines.filter(
        ({ medicine }) => medicine.nameAr && medicine.nameAr.includes(term)
      );
    },
    [allMedicines]
  );

  const searchPharmacies = useCallback(
    (searchTerm) => {
      const term = (searchTerm || "").trim();
      if (!term) return pharmacies;
      return pharmacies.filter(
        (pharmacy) =>
          (pharmacy.name && pharmacy.name.includes(term)) ||
          (pharmacy.location && pharmacy.location.includes(term))
      );
    },
    [pharmacies]
  );

  const value = useMemo(() => ({
    pharmacies,
    bulletins,
    ads,
    approvals,
    violations,
    allMedicines,
    setBulletins,
    setApprovals,
    setViolations,
    addBulletin,
    updateApprovalStatus,
    updateViolationStatus,
    getPharmacyById,
    getMedicineById,
    getPharmacyMedicines,
    getPharmacyOffers,
    searchMedicines,
    searchPharmacies,
    OFFICIAL_PRICES,
  }), [
    pharmacies,
    bulletins,
    ads,
    approvals,
    violations,
    allMedicines,
    setBulletins,
    setApprovals,
    setViolations,
    addBulletin,
    updateApprovalStatus,
    updateViolationStatus,
    getPharmacyById,
    getMedicineById,
    getPharmacyMedicines,
    getPharmacyOffers,
    searchMedicines,
    searchPharmacies,
  ]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useDataContext must be used within a DataProvider");
  return context;
};

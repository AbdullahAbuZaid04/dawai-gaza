import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";

// Layouts (Lazy)
const MainLayout = lazy(() => import("../layouts/MainLayout"));

// Citizen Pages (Lazy)
const Home = lazy(() => import("../pages/citizen/Home"));
const About = lazy(() => import("../pages/citizen/About"));
const SearchMedicine = lazy(() => import("../pages/citizen/SearchMedicine"));
const PharmacyProfile = lazy(() => import("../pages/citizen/PharmacyProfile"));
const SearchPharmacy = lazy(() => import("../pages/citizen/SearchPharmacy"));
const MedicineDetails = lazy(() => import("../pages/citizen/MedicineDetails"));
const CitizenBulletins = lazy(() => import("../pages/citizen/CitizenBulletins"));

// Syndicate Pages (Lazy)
const PharmacyDashboard = lazy(() => import("../pages/pharmacist/Dashboard"));
const PharmacistInventory = lazy(() => import("../pages/pharmacist/Inventory"));
const PharmacistAdsManager = lazy(() => import("../pages/pharmacist/AdsManager"));

const SyndicateDashboard = lazy(() => import("../pages/syndicate/Dashboard"));
const SyndicateBulletins = lazy(() => import("../pages/syndicate/SyndicateBulletins"));
const SyndicateApprovals = lazy(() => import("../pages/syndicate/SyndicateApprovals"));
const SyndicatePriceMonitoring = lazy(() => import("../pages/syndicate/SyndicatePriceMonitoring"));

const SyndicatePharmacies = lazy(() => import("../pages/syndicate/SyndicatePharmacies"));

const SyndicateMedicines = lazy(() => import("../pages/syndicate/SyndicateMedicines"));

const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const ProtectedRoute = lazy(() => import("../auth/ProtectedRoute"));
const Page404 = lazy(() => import("../components/common/Page404"));

const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-slate-50">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchMedicine />} />
            <Route path="/pharmacies" element={<SearchPharmacy />} />
            <Route path="/pharmacy/:id" element={<PharmacyProfile />} />
            <Route path="/medicine/:pharmacyId/:medicineId" element={<MedicineDetails />} />
            <Route path="/bulletins" element={<CitizenBulletins />} />

            <Route element={<ProtectedRoute role="syndicate" />}>
              <Route path="/syndicate" element={<SyndicateDashboard />} />
              <Route path="/syndicate/bulletins" element={<SyndicateBulletins />} />
              <Route path="/syndicate/approvals" element={<SyndicateApprovals />} />
              <Route path="/syndicate/price-monitoring" element={<SyndicatePriceMonitoring />} />
              <Route path="/syndicate/pharmacies" element={<SyndicatePharmacies />} />
              <Route path="/syndicate/medicines" element={<SyndicateMedicines />} />
            </Route>

            <Route element={<ProtectedRoute role="Pharmacist" />}>
              <Route path="/pharmacist" element={<PharmacyDashboard />} />
              <Route path="/pharmacist/:pharmacyId/inventory" element={<PharmacistInventory />} />
              <Route path="/pharmacist/:pharmacyId/AdsManager" element={<PharmacistAdsManager />} />
            </Route>
          </Route>
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouter;

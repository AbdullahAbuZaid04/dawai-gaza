import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "../config/api";

// Icons
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MapIcon from "@mui/icons-material/Map";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const GOVERNORATES = [
  { id: 1, name: "شمال غزة" },
  { id: 2, name: "غزة" },
  { id: 3, name: "دير البلح" },
  { id: 4, name: "خانيونس" },
  { id: 5, name: "رفح" },
];

const Register = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    pharmacyName: "",
    licenseNumber: "",
    phone: "",
    email: "",
    address: "",
    governorateId: "",
    startTime: "08:00",
    endTime: "22:00",
    googleMapsLink: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.pharmacyName) tempErrors.pharmacyName = "اسم الصيدلية مطلوب";
    if (!formData.licenseNumber) tempErrors.licenseNumber = "رقم الترخيص مطلوب";
    if (!formData.phone) tempErrors.phone = "رقم الهاتف مطلوب";
    else if (!/^\d{10}$|^\d{3}-\d{4}-\d{3}$/.test(formData.phone))
      tempErrors.phone = "رقم الهاتف غير صحيح";
    if (!formData.email) tempErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "البريد الإلكتروني غير صحيح";
    if (!formData.address) tempErrors.address = "العنوان مطلوب";
    if (!formData.startTime) tempErrors.startTime = "وقت البدء مطلوب";
    if (!formData.endTime) tempErrors.endTime = "وقت النهاية مطلوب";
    if (!formData.governorateId) tempErrors.governorateId = "المحافظة مطلوبة";
    if (!formData.password) tempErrors.password = "كلمة المرور مطلوبة";
    else if (formData.password.length < 6) tempErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await axios.post(`${API_BASE_URL}/pharmacies/register-request`, {
          pharmacy_name_ar: formData.pharmacyName,
          email: formData.email,
          phone: formData.phone,
          address_note: formData.address,
          governorate_id: formData.governorateId,
          license_number: formData.licenseNumber,
          password: formData.password,
          open_time: formData.startTime,
          close_time: formData.endTime,
          google_maps_link: formData.googleMapsLink,
        });
        setSubmitted(true);
      } catch (err) {
        const serverMsg = err?.response?.data?.message;
        const firstErr = err?.response?.data?.errors
          ? Object.values(err.response.data.errors)[0]?.[0]
          : null;
        setErrors({
          ...errors,
          form:
            firstErr ||
            serverMsg ||
            "حدث خطأ في التسجيل. يرجى المحاولة لاحقاً.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-ui-bg overflow-hidden"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-2xl border border-dashed border-primary shadow-xl max-w-md w-full text-center mx-4"
        >
          <div className="w-20 h-20 bg-status-success text-content-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-status-success/20">
            <CheckCircleIcon className="!text-[48px]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-content-main mb-4 tracking-tight">
            تم إرسال الطلب بنجاح
          </h2>
          <div className="bg-status-success/5 text-status-success p-6 rounded-xl mb-8 font-bold border border-status-success/10 leading-relaxed text-sm">
            حسابك الآن{" "}
            <span className="underline decoration-wavy underline-offset-4">
              قيد المراجعة
            </span>
            . سنقوم بإشعارك فور تفعيل الحساب من قبل النقابة.
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary/20"
          >
            العودة لتسجيل الدخول
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-ui-bg overflow-hidden"
      dir="rtl"
    >
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 my-8">
        {/* Top Link */}
        <div className="mb-6 w-full max-w-5xl text-right">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-content-light font-bold bg-ui-card hover:text-content-main transition-colors px-4 py-2 rounded-xl"
          >
            <ArrowForwardIcon className="!text-[20px]" />
            <span>العودة لتسجيل الدخول</span>
          </Link>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl bg-ui-card p-6 md:p-10 rounded-2xl border border-dashed border-primary shadow-sm"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary text-content-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LocalPharmacyIcon className="!text-[32px]" />
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-content-main mb-2 tracking-tight">
              تسجيل صيدلية جديدة
            </h1>
            <p className="text-content-light font-medium max-w-lg mx-auto">
              انضم إلى منظومتنا وساهم في تعزيز الصحة العامة في قطاع غزة.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Column 1: الأساسيات */}
              <div className="space-y-6">
                <InputField
                  label="اسم الصيدلية"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  placeholder="صيدلية الشفاء المركزية"
                  icon={<LocalPharmacyIcon />}
                  error={errors.pharmacyName}
                />

                <InputField
                  label="بداية العمل"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  icon={<AccessTimeIcon />}
                  error={errors.startTime}
                />

                <div className="space-y-2 text-right">
                  <label
                    htmlFor="register-governorateId"
                    className="block text-xs font-black text-content-light mr-2 uppercase tracking-wide"
                  >
                    المحافظة
                  </label>
                  <div className="relative group">
                    <LocationCityIcon className="absolute right-4 top-1/2 -translate-y-1/2 !text-[20px] text-primary pointer-events-none" />
                    <select
                      id="register-governorateId"
                      name="governorateId"
                      value={formData.governorateId}
                      onChange={handleChange}
                      className={`w-full pr-12 pl-4 py-3.5 rounded-xl bg-ui-bg/25 border-2 border-ui-border outline-none font-bold text-content-main transition-all appearance-none cursor-pointer ${
                        errors.governorateId
                          ? "border-status-error"
                          : "border-transparent focus:border-primary"
                      }`}
                    >
                      <option value="">-- اختر المحافظة --</option>
                      {GOVERNORATES.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.governorateId && (
                    <p
                      role="alert"
                      className="text-status-error text-xs font-bold mr-2 mt-1"
                    >
                      {errors.governorateId}
                    </p>
                  )}
                </div>

                <InputField
                  label="البريد الإلكتروني"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pharmacy@example.com"
                  icon={<EmailIcon />}
                  error={errors.email}
                />

                <InputField
                  label="رقم الهاتف"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="059-0000-000"
                  icon={<PhoneIcon />}
                  error={errors.phone}
                />
              </div>

              {/* Column 2: الموقع والوقت */}
              <div className="space-y-6">
                <InputField
                  label="رقم الترخيص"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="MOH-123456"
                  icon={<BadgeIcon />}
                  error={errors.licenseNumber}
                />

                <InputField
                  label="نهاية العمل"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  icon={<AccessTimeIcon />}
                  error={errors.endTime}
                />

                <InputField
                  label="العنوان بالتفصيل"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="المدينة - الشارع - المعلم"
                  icon={<BusinessIcon />}
                  error={errors.address}
                />

                <InputField
                  label="رابط جوجل ماب (اختياري)"
                  name="googleMapsLink"
                  value={formData.googleMapsLink}
                  onChange={handleChange}
                  placeholder="https://goo.gl/maps/..."
                  icon={<MapIcon />}
                />

                <InputField
                  label="كلمة المرور"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="كلمة مرور "
                  icon={<VisibilityOffOutlinedIcon />}
                />
              </div>
            </div>

            {errors.form && (
              <div
                role="alert"
                className="mt-4 p-4 bg-status-error/10 text-status-error rounded-xl text-sm font-bold border border-status-error/20 text-center"
              >
                {errors.form}
              </div>
            )}
            {/* Submit Button */}
            <div className="pt-4 md:pt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:max-w-md py-4 bg-primary text-content-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-5 h-5 border-2 border-content-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "جاري الإرسال..." : "إرسال طلب التسجيل"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// --- Reusable Input Field Component (Updated Style) ---
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  error,
}) => {
  const inputId = `register-${name}`;
  return (
    <div className="space-y-2 text-right">
      <label
        htmlFor={inputId}
        className="block text-xs font-black text-content-light mr-2 uppercase tracking-wide"
      >
        {label}
      </label>
      <div className="relative group">
        {React.cloneElement(icon, {
          className: `absolute right-4 top-1/2 -translate-y-1/2 !text-[20px] transition-colors ${
            error ? "text-status-error" : "text-primary"
          }`,
        })}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pr-12 pl-4 py-3.5 rounded-xl bg-ui-bg/25 border-2 border-ui-border outline-none font-bold text-content-main transition-all ${
            error
              ? "border-status-error"
              : "border-transparent focus:border-primary "
          }`}
        />
      </div>
      {error && (
        <p
          role="alert"
          className="text-status-error text-xs font-bold mr-2 mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Register;

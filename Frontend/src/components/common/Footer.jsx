import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

function Footer() {
  const quickLinks = [
    { label: "الرئيسية", path: "/" },
    { label: "من نحن", path: "/about" },
    { label: " الأدوية", path: "/search" },
    { label: "الصيدليات", path: "/pharmacies" },
  ];

  const servicesLinks = [
    { text: "البحث الذكي" },
    { text: "خريطة الصيدليات" },
    { text: "نشرات التوعية" },
    { text: "تسجيل صيدلية" },
  ];

  return (
    <footer dir="rtl" className="bg-ui-footer py-12 md:pt-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 text-right">
          {/* 1. Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <LocalPharmacyIcon className="text-primary !text-[40px]" />
              <span className="text-2xl font-black text-primary tracking-tight">دوائي</span>
            </div>
            <p className="text-content-inverse leading-relaxed text-[0.95rem] mb-8">
              المنصة الشاملة الوحيدة في قطاع غزة للبحث عن الأدوية، نهدف لمساعدتك في العثور على علاجك
              بسهولة وسرعة.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: LinkedInIcon, label: "لينكد إن" },
                { Icon: InstagramIcon, label: "إنستغرام" },
                { Icon: TwitterIcon, label: "تويتر" },
                { Icon: FacebookIcon, label: "فيسبوك" },
              ].map(({ Icon, label }, idx) => (
                <button
                  key={idx}
                  aria-label={label}
                  className="w-10 h-10 bg-primary/10 text-content-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
                >
                  <Icon className="!text-[20px]" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h2 className="text-lg font-extrabold text-content-white mb-6">روابط سريعة</h2>
            <div className="flex flex-col gap-4 text-[0.95rem]">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="text-content-inverse hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Services */}
          <div>
            <h2 className="text-lg font-extrabold text-content-white mb-6">خدماتنا</h2>
            <div className="flex flex-col gap-4 text-[0.95rem]">
              {servicesLinks.map((item, idx) => (
                <span key={idx} className="text-content-inverse">
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Contact Us */}
          <div>
            <h2 className="text-lg font-extrabold text-content-white mb-6">تواصل معنا</h2>
            <div className="flex flex-col gap-5 text-[0.95rem]">
              {[
                { icon: <LocationOnIcon />, text: "غزة، فلسطين" },
                { icon: <PhoneIcon />, text: "059-0000-000" },
                { icon: <EmailIcon />, text: "info@dawai.ps" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-content-inverse font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-content-white/5 text-center">
          <p className="text-content-inverse text-sm font-medium">
            © {new Date().getFullYear()} دوائي – جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import HeroSection from "../../components/citizen/home/HeroSection";
import ServicesSection from "../../components/citizen/home/ServicesSection";
import HowItWorksSection from "../../components/citizen/home/HowItWorksSection";
import FeaturedMedicinesSection from "../../components/citizen/home/FeaturedMedicinesSection";
import FeaturedPharmaciesSection from "../../components/citizen/home/FeaturedPharmaciesSection";
import HealthCenterSection from "../../components/citizen/home/HealthCenterSection";
import FeatureSection from "../../components/citizen/home/components/FeatureSection";

//assets
import pillLuxe from "../../assets/pill-luxe.png";
import medKitImg from "../../assets/med-kit.png";
import trustImg from "../../assets/trust-badge.png";

function Home() {
  return (
    <div dir="rtl" className="bg-ui-card overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <FeaturedMedicinesSection />
      <FeaturedPharmaciesSection />

      <FeatureSection
        chipLabel="البحث عن دواء"
        title="قاعدة بيانات شاملة لجميع أدوية غزة."
        description="إذا كنت تبحث عن الأدوية، نوفر لك كافة المعلومات عن توفر الأدوية وأسعارها المحدثة في لحظتها، مع ميزة البحث الذكي."
        features={[
          "تحديث فوري لتوفر الأصناف في جميع صيدليات القطاع.",
          "عرض الأسعار الرسمية الموثقة من نقابة الصيادلة لمنع التلاعب.",
          "البحث بالاسم للحصول على أدق النتائج.",
        ]}
        image={pillLuxe}
        imageAlt="أيقونة دواء"
        imageMaxWidth={280}
        bgColor="ui-card"
      />

      <FeatureSection
        chipLabel="دليل الصيدليات"
        chipColor="secondary"
        title="الصيدلية الأقرب إليك دائماً في المتناول."
        description="دليل تفاعلي يضم مئات الصيدليات المعتمدة، مع عرض دقيق لمواقعهم على الخريطة وساعات عملهم المحدثة لحظة بلحظة ."
        features={["تحديد مواقع الصيدليات عبر GPS.", "عرض أرقام التواصل وساعات الدوام."]}
        image={medKitImg}
        imageAlt="أيقونة حقيبة إسعافات أولية"
        imageMaxWidth={300}
        reverse={true}
      />

      <FeatureSection
        chipLabel="الموثوقية"
        title="معلوماتك محمية وبإشراف رسمي."
        description="نعمل بانسجام تام مع نقابة الصيادلة لضمان صحة البيانات المنشورة وحماية المواطن من التلاعب بالأسعار أو الأصناف."
        features={["ربط مباشر مع قاعدة بيانات النقابة المركزية."]}
        image={trustImg}
        imageAlt="شارة ثقة"
        imageMaxWidth={280}
        bgColor="ui-card"
      />

      <HealthCenterSection />
    </div>
  );
}

export default Home;

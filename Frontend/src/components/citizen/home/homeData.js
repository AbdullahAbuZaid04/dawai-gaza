import { Search, Store, ShieldCheck, Zap, ArrowLeftRight, Info } from "lucide-react";

export const services = [
  {
    icon: <Search />,
    title: "بحث سريع وذكي",
    description: "ابحث عن أي دواء بسهولة واحصل على نتائج دقيقة في ثوانٍ معدودة.",
    color: "primary",
  },
  {
    icon: <Store />,
    title: "اعثر على أقرب صيدلية",
    description: "اكتشف الصيدليات القريبة منك التي توفر الدواء الذي تبحث عنه حالاً.",
    color: "secondary",
  },
  {
    icon: <ShieldCheck />,
    title: "معلومات موثوقة",
    description: "بيانات دقيقة ومحدثة من صيدليات معتمدة ومرخصة من نقابة الصيادلة.",
    color: "success",
  },
  {
    icon: <Zap />,
    title: "توفير الوقت والجهد",
    description: "لا حاجة للاتصال بعدة صيدليات، اعرف التوفر مباشرة من مكانك.",
    color: "primary",
  },
  {
    icon: <ArrowLeftRight />,
    title: "مقارنة الأسعار",
    description: "قارن أسعار الدواء بين الصيدليات المختلفة واصل إلى الخيار الأنسب لك.",
    color: "secondary",
  },
  {
    icon: <Info />,
    title: "تفاصيل شاملة",
    description: "احصل على معلومات كاملة عن الدواء، الاستخدام، والبدائل المتاحة.",
    color: "success",
  },
];

export const steps = [
  {
    step: "1",
    title: "ابحث عن الدواء",
    desc: "أدخل اسم الدواء الذي تبحث عنه في شريط البحث",
    icon: <Search />,
    color: "primary",
  },
  {
    step: "2",
    title: "اختر الصيدلية",
    desc: "شاهد قائمة الصيدليات التي يتوفر فيها الدواء",
    icon: <Store />,
    color: "secondary",
  },
  {
    step: "3",
    title: "احصل على الدواء",
    desc: "توجه إلى الصيدلية واحصل على دوائك بسهولة",
    icon: <ShieldCheck />,
    color: "success",
  },
];

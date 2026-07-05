import { createTheme } from "@mui/material/styles";
import projectColors from "./colors"; // استيراد ملف الألوان المركزي

/**
 * 🎨 إعدادات Material UI (MUI)
 * هذا الملف يخبر المكونات الجاهزة (مثل الأزرار وحقول الإدخال) باستخدام نفس ألوان المشروع.
 * المصدر الرئيسي للألوان هو ملف "src/colors.js" فقط.
 */

// اختصار أسماء الألوان للسهولة
const c = projectColors;

const theme = createTheme({
  // ضبط اتجاه النص لليمين (عربي)
  direction: "rtl",

  // لوحة الألوان (تطبيق الألوان من colors.js)
  palette: {
    primary: {
      main: c.primary, // اللون الرئيسي
      dark: c.primaryDark, // اللون الغامق
      light: c.primaryLight, // اللون الفاتح
    },
    // الألوان الثانوية والوظيفية
    secondary: { main: c.secondary }, // اللون الثانوي
    success: { main: c.success }, // لون النجاح
    error: { main: c.error }, // لون الخطأ
    warning: { main: c.warning }, // لون التحذير

    // ألوان الخلفية والنصوص
    background: {
      default: c.background, // الخلفية العامة للصفحات
      paper: c.surface, // خلفية البطاقات (Paper)
    },
    text: {
      primary: c.text, // النص الأساسي
      secondary: c.textLight, // النص الثانوي (رمادي)
    },
  },

  // الخطوط (Typography)
  typography: {
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
  },

  // الحواف الافتراضية للعناصر (Border Radius)
  shape: { borderRadius: 16 }, // حواف دائرية بقطر 16px لجميع العناصر
});

export default theme;

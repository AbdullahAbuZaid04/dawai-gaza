const colors = require("./src/colors");

/**
 * 🎨 دالة توليد الدرجات (معدلة لتكون ألوان صلبة Solid وليست شفافة لضمان دقة اللون)
 */
function generateShades(baseColor, lightColor, darkColor) {
  return {
    50: lightColor + "15", // للشفافية الخفيفة جداً (اختياري)
    100: lightColor, // الدرجة الفاتحة
    500: baseColor, // الدرجة الأساسية
    700: darkColor, // الدرجة الداكنة
    DEFAULT: baseColor, // عند كتابة bg-primary
  };
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 1. ألوان الهوية (Brand)
        primary: generateShades(
          colors.primary,
          colors.primaryLight,
          colors.primaryDark,
        ),
        secondary: colors.secondary, // bg-secondary

        // 2. ألوان الحالة (Status)
        status: {
          success: colors.success, // text-status-success
          error: colors.error, // bg-status-error
          warning: colors.warning,
        },

        // 3. ألوان الواجهة (UI) - اختصرنا الكلمات لسهولة الكتابة
        ui: {
          bg: colors.background, // bg-ui-bg
          card: colors.surface, // bg-ui-card
          gray: colors.surfaceAlt, // bg-ui-gray
          border: colors.border, // border-ui-border
          footer: colors.footer, // bg-ui-footer
        },

        // 4. ألوان النصوص (Typography) - سميناها 'content' لنتجنب text-text
        content: {
          main: colors.text, // text-content-main (الأساسي الغامق)
          white: colors.textWhite, // text-content-white (الأساسي الأبيض)
          light: colors.textLight, // text-content-light (الرمادي)
          inverse: colors.textOnDark, // text-content-inverse (الفاتح للفوتر)
        },
      },

      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "sans-serif"],
      },

      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};

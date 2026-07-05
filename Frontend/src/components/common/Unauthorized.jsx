import React from "react";
import { Link } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-ui-gray p-6" dir="rtl">
      <div className="max-w-xl w-full bg-ui-card rounded-2xl p-10 text-center shadow-lg border border-dashed border-primary">
        <div className="text-6xl text-yellow-500 mx-auto mb-6">
          <ReportProblemIcon fontSize="inherit" />
        </div>
        <h1 className="text-2xl font-black text-content-main mb-2">غير مصرح بالدخول</h1>
        <p className="text-content-light mb-6">لا تملك الصلاحية للوصول إلى هذه الصفحة.</p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-primary text-content-white rounded-xl font-bold hover:bg-primary-700 transition-all duration-300 active:scale-95"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

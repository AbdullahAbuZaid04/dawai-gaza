import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-ui-gray p-6" dir="rtl">
      <div className="max-w-xl w-full bg-ui-card rounded-2xl p-10 text-center shadow-lg border border-dashed border-primary">
        <h1 className="text-6xl font-black text-red-500 mb-2">404</h1>
        <p className="text-content-light text-xl mb-6">الصفحة غير موجودة</p>
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

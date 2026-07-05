import { Megaphone, Pill } from "lucide-react";

function BulletinTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center mb-12 px-6">
      <div className="bg-ui-card p-1.5 gap-3 rounded-2xl border border-ui-border inline-flex shadow-sm">
        <button
          onClick={() => onTabChange("bulletins")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
            activeTab === "bulletins"
              ? "bg-primary text-content-white shadow-md shadow-primary/20"
              : "text-content-light hover:bg-ui-gray hover:text-content-main"
          }`}
        >
          <Pill size={18} />
          المراكز الصحية
        </button>

        <button
          onClick={() => onTabChange("offers")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
            activeTab === "offers"
              ? "bg-primary text-content-white shadow-md shadow-primary/20"
              : "text-content-light hover:bg-ui-gray hover:text-content-main"
          }`}
        >
          <Megaphone size={18} />
          الاعلانات
        </button>
      </div>
    </div>
  );
}

export default BulletinTabs;

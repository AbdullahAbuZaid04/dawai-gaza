import { Pill, Clock } from "lucide-react";
import { formatTimeRangeArabic } from "../../../utils/time";

function ProfileSidebar({ pharmacy, tabs, activeTab, onTabChange }) {
  return (
    <aside className="profile-sidebar w-full md:w-[350px] shrink-0 bg-ui-card border-l border-ui-border p-6 md:p-8 flex flex-col z-20 md:overflow-y-auto">
      {/* Profile Header */}
      <div className="text-center mb-8 shrink-0">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-ui-gray mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-primary">
          <Pill className="text-primary w-10 h-10 md:w-12 md:h-12" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-content-main mb-4">{pharmacy.name}</h1>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-primary/20 bg-primary/5 text-primary text-xs font-black">
          <Clock size={14} />
          {formatTimeRangeArabic(pharmacy.open_time, pharmacy.close_time)}
        </span>
      </div>

      <div className="h-px bg-ui-border mb-8" />

      {/* Navigation */}
      <nav className="space-y-2 flex flex-col">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`sidebar-item w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm ${
              activeTab === tab.id
                ? "bg-primary text-content-white shadow-lg shadow-primary/20"
                : "text-content-light hover:bg-ui-gray hover:text-content-main"
            }`}
          >
            <span className="shrink-0">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default ProfileSidebar;

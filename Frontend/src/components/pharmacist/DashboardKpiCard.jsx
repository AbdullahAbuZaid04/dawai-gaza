const DashboardKpiCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  onClick,
  badge,
  limitValueClass,
}) => {
  return (
    <div
      className={`bg-ui-card p-6 rounded-xl shadow-sm border border-dashed hover:shadow-xl transition-all duration-300 ${colorClass.border} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-6">
        <div className={`p-4 rounded-2xl ${colorClass.bg} ${colorClass.text}`}>
          <Icon className="w-6 h-6" />
        </div>
        {badge && (
          <span
            className={`px-2 py-1 rounded-lg text-xs font-bold ${colorClass.text} border ${colorClass.border}`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className={`text-2xl font-bold text-content-main mb-1 ${limitValueClass || ""}`}>
        {value}
      </div>
      <div className="text-content-light font-bold">{title}</div>
    </div>
  );
};

export default DashboardKpiCard;

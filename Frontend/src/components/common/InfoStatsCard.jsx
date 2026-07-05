function InfoStatsCard({ icon, label, value, color }) {
  return (
    <div
      style={{ "--hover-color": color }}
      className={`bg-ui-card p-6 rounded-2xl border border-ui-border flex items-center gap-6 hover:border-[var(--hover-color)] transition-all duration-300`}
    >
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}10`, color: color }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-black text-content-light uppercase tracking-widest mb-1">
          {label}
        </span>
        <span className="text-lg font-black text-content-main leading-tight">{value}</span>
      </div>
    </div>
  );
}

export default InfoStatsCard;

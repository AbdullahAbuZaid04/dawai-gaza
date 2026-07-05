const AdCard = ({ ad }) => {
  return (
    <div className="bg-ui-card rounded-2xl overflow-hidden shadow-sm border border-ui-border hover:shadow-xl transition-all duration-300">
      <div className="h-48 relative">
        <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
        {ad.discount && (
          <div className="absolute top-4 right-4 bg-status-error text-content-white font-black px-3 py-1 rounded-lg text-sm shadow-lg">
            خصم {ad.discount}%
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-bold text-primary mb-2 block">نُشر في: {ad.start_date}</span>
        <h3 className="text-lg font-black text-content-main mb-2 line-clamp-1">{ad.title}</h3>
        <p className="text-sm text-content-light line-clamp-2 mb-3">{ad.description}</p>
        {ad.end_date && (
          <div className="text-xs font-bold text-status-warning bg-status-warning/10 px-3 py-1.5 rounded-lg inline-block">
            ينتهي العرض في: {ad.end_date}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdCard;

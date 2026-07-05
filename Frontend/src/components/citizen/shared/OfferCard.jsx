import { Tag } from "lucide-react";

function OfferCard({
  image_url: image,
  title,
  description,
  end_date,
  pharmacyName,
  pharmacyId,
  showPharmacyInfo = true,
  showAction = true,
}) {
  return (
    <div
      className={`h-full w-full max-w-[360px] mx-auto rounded-xl border transition-all duration-400 ease-out overflow-hidden flex flex-col hover:border-primary group`}
    >
      {/* Image Container */}
      <div className="relative h-[200px] overflow-hidden bg-ui-gray">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-content-light bg-ui-gray">
            <Tag size={64} />
          </div>
        )}

        {showPharmacyInfo && pharmacyName && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-content-white flex items-center gap-2">
            <span className="text-[10px] font-black">{pharmacyName}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-black text-content-main leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm font-medium text-content-light leading-relaxed mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-ui-border flex items-center justify-between">
          <div className="text-right">
            <span className="block text-[10px] font-black text-content-light">تاريخ الانتهاء</span>
            <span className="text-sm font-black text-status-error">{end_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;

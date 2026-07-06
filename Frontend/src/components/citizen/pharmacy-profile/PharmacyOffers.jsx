import { Tag } from "lucide-react";
import OfferCard from "../shared/OfferCard";

function PharmacyOffers({ offers }) {
  return (
    <div key="offers">
      <h2 className="text-3xl md:text-5xl font-black text-content-main mb-10">العروض والمزايا</h2>
      {offers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((ad) => (
            <OfferCard
              key={ad.id}
              image_url={ad.image_url}
              title={ad.title}
              description={ad.description}
              end_date={ad.end_date}
              pharmacyName={ad.pharmacy?.name_ar}
              pharmacyId={ad.pharmacy_id}

              showPharmacyInfo={false}
              showAction={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-ui-card rounded-2xl border-2 border-dashed border-ui-border">
          <Tag className="w-20 h-20 text-ui-border mx-auto mb-6 opacity-20" />
          <h3 className="text-2xl font-black text-ui-border">لا توجد عروض حالية لهذه الصيدلية</h3>
        </div>
      )}
    </div>
  );
}

export default PharmacyOffers;

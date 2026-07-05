import OfferCard from "../shared/OfferCard";

function OfferList({ offers }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-20 max-w-7xl mx-auto">
      {offers.map((ad) => (
        <OfferCard key={ad.id} {...ad} />
      ))}
    </div>
  );
}

export default OfferList;

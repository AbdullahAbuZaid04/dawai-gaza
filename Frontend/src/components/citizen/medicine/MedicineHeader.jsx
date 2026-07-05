function MedicineHeader({ medicine, pharmacy }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-content-main leading-tight mb-2">
            {medicine.name_ar}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-content-light font-bold">{pharmacy.pharmacy_name_ar}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ui-border" />
            <span className="text-primary font-black text-xl">{medicine.price} ₪</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicineHeader;

function MedicineUsage({ medicine }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-black text-content-main mb-6 flex items-center gap-3">
        <div className="w-1 h-8 bg-primary rounded-full" />
        كيفية الاستخدام
      </h2>

      <p className="text-content-light leading-relaxed text-lg font-medium">
        {medicine.leaflet_dosage}
      </p>
    </section>
  );
}

export default MedicineUsage;

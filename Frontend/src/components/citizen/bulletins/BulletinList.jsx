function BulletinList({ bulletins }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-20 max-w-7xl mx-auto">
      {bulletins.map((bulletin) => (
        <div
          key={bulletin.id}
          className="bulletin-card bg-ui-card rounded-3xl border border-ui-border p-8 flex flex-col items-start gap-6 hover:shadow-2xl transition-all duration-500 hover:border-primary/40 group"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-content-light text-xs font-black bg-ui-gray px-3 py-1.5 rounded-lg border border-ui-border">
              {bulletin.name_ar}
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-content-main leading-tight group-hover:text-primary transition-colors">
            {bulletin.address_note}
          </h3>

          <p className="text-content-light text-sm md:text-base font-medium leading-loose">
            {bulletin.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BulletinList;

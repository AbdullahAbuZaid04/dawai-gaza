import { Filter } from "lucide-react";

function EmptySearchState({ title, subtitle, query }) {
  return (
    <div
      key="no-results"
      className="w-full text-center py-10 md:py-20 bg-ui-card rounded-2xl border-2 border-dashed border-ui-border"
    >
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-ui-card rounded-full flex items-center justify-center border border-dashed border-ui-border">
          <Filter className="w-8 h-8 text-content-light" />
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-content-main mb-4">
        {title} <span className="text-primary">"{query}"</span>
      </h3>
      <p className="text-content-light font-medium max-w-md mx-auto">{subtitle}</p>
    </div>
  );
}

export default EmptySearchState;

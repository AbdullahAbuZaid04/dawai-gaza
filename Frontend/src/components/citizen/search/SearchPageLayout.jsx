import SearchBar from "../../common/SearchBar";
import Pagination from "../../common/Pagination";
import EmptySearchState from "../shared/EmptySearchState";

function SearchPageLayout({
  title,
  description,
  searchPlaceholder,
  query,
  onQueryChange,
  onSearch,
  hasSearched,
  results,
  resultsLabel = "النتائج",
  renderItem,
  emptyStateText,
  emptyStateSubtext,
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  return (
    <div dir="rtl" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20 text-right">
      {/* 1. Header & Search Bar */}
      <div className="search-header-content text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-content-light font-medium max-w-2xl mx-auto leading-relaxed mb-12">
          {description}
        </p>

        <SearchBar
          value={query}
          onChange={onQueryChange}
          onSubmit={onSearch}
          placeholder={searchPlaceholder}
        />
      </div>

      {/* 2. Content Area */}
      <div className="w-full min-h-[400px] search-results-area">
        {results.length > 0 ? (
          <div>
            <div className="mb-10">
              <h2 className="text-2xl font-black text-content-main">
                {resultsLabel} <span className="text-primary">({results.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.slice((page - 1) * 16, page * 16).map((item, index) => {
                const globalIndex = (page - 1) * 16 + index;
                return renderItem(item, globalIndex);
              })}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => onPageChange(null, p)}
            />
          </div>
        ) : hasSearched ? (
          <EmptySearchState title={emptyStateText} subtitle={emptyStateSubtext} query={query} />
        ) : null}
      </div>
    </div>
  );
}

export default SearchPageLayout;

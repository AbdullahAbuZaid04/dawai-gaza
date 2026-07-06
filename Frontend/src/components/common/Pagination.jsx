function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="تصفح الصفحات" className="flex justify-center mt-16 gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="الصفحة السابقة"
        className="h-12 px-4 rounded-xl font-black transition-all bg-surface text-content-light border border-ui-border hover:bg-ui-gray disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {"< السابق"}
      </button>
      {pageNumbers.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="w-12 h-12 flex items-center justify-center text-content-light font-bold">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-label={`الصفحة ${p}`}
            aria-current={page === p ? "page" : undefined}
            className={`w-12 h-12 rounded-xl font-black transition-all ${
              page === p
                ? "bg-primary text-content-white shadow-lg shadow-primary/20"
                : "bg-surface text-content-light border border-ui-border hover:bg-ui-gray"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="الصفحة التالية"
        className="h-12 px-4 rounded-xl font-black transition-all bg-surface text-content-light border border-ui-border hover:bg-ui-gray disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {"التالي >"}
      </button>
    </nav>
  );
}

export default Pagination;

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="تصفح الصفحات" className="flex justify-center mt-16 gap-2">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          aria-label={`الصفحة ${i + 1}`}
          aria-current={page === i + 1 ? "page" : undefined}
          className={`w-12 h-12 rounded-xl font-black transition-all ${
            page === i + 1
              ? "bg-primary text-content-white shadow-lg shadow-primary/20"
              : "bg-surface text-content-light border border-ui-border hover:bg-ui-gray"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </nav>
  );
}

export default Pagination;

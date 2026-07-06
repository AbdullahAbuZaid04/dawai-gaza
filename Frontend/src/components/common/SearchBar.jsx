import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ value, onChange, onSubmit, placeholder, buttonText = "بحث" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-content-white rounded-full border-2 border-primary/10 shadow-xl shadow-primary/5 transition-all duration-300 focus-within:border-primary focus-within:shadow-2xl focus-within:shadow-primary/10 p-1 md:p-2 mx-auto w-full max-w-3xl"
    >
      <div className="flex-1 flex items-center px-4 md:px-6">
        <SearchIcon
          className="text-primary !text-[20px] md:!text-[28px] shrink-0"
          aria-hidden="true"
        />
        <input
          type="text"
          aria-label={placeholder || "بحث"}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none px-3 md:px-4 py-2 md:py-3 text-sm md:text-xl font-medium text-text placeholder-text-light"
          value={value}
          onChange={onChange}

        />
      </div>
      <button
        type="submit"
        className="bg-primary text-content-white rounded-full px-6 md:px-12 py-2 md:py-4 text-sm md:text-lg font-black active:scale-[0.98] transition-all shadow-lg shadow-primary/20 hover:bg-primary-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default SearchBar;

const SearchBar = ({placeholder,className}:any) => {
    return (
      <div className={`${className}`} style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          className="pl-10 text-lg lg:text-2xl p-1 border rounded-lg w-full "
          placeholder={`${placeholder}`}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "24px",
            height: "24px",
            color: "#888",
          }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    );
  };
  
  export default SearchBar;
  
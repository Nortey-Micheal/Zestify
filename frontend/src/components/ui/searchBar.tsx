import useSearchRecipe from "@/hooks/recipes/useSearchRecipe";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SearchBar ({placeholder,className,page}:any) {
  const [ searchItem, setSearchItem ] = useState<string>('')
  const { isSearching, searchError, searchRecipe } = useSearchRecipe()

  const handleSearch = async() => {
    await searchRecipe(searchItem,page)
  }

  useEffect(() => {
    handleSearch()
  },[page])

  useEffect(() => {
    (searchError?.length)! > 0 && toast.error(searchError)
  },[searchError])
  
  return (
    <div className={`${className} flex items-center justify-end gap-5`} >
      <div className="w-[90%] " style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          onChange={(e) => setSearchItem(e.target.value)}
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
          className="top-1/2"
          style={{
            position: "absolute",
            left: "10px",
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
      <button disabled={isSearching} className="bg-(--zesty-orange) disabled:bg-(--light-grey) my-2 py-1 px-3 rounded-xl cursor-pointer font-bold text-lg " onClick={handleSearch} >Search</button>
    </div>
  );
};
  
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const SortBy = () => {
  const sortList = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSortList = () => {
    sortList.current.classList.toggle("hidden");
  };

  const handleOnOptionClick = (key, value) => {
    toggleSortList();
    setSearchParams((prevParams) => {
      if (value == null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const handleOutsideClick = (e) => {
    if (sortList.current && !sortList.current.contains(e.target)) {
      sortList.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative mt-4 flex gap-4">
      <div className="font-semibold">Sort by:</div>
      <div>
        <button onClick={toggleSortList} className="border px-2">
          {searchParams.get("sortBy")
            ? searchParams.get("sortBy") === "likes"
              ? "most likes"
              : "most comments"
            : "none"}
        </button>
        <div
          ref={sortList}
          className="absolute flex hidden flex-col gap-2 border bg-white p-2"
        >
          <button
            onClick={() => handleOnOptionClick("sortBy", "likes")}
            className="px-1 text-start hover:bg-slate-200"
          >
            most likes
          </button>
          <button
            onClick={() => handleOnOptionClick("sortBy", "comments")}
            className="px-1 text-start hover:bg-slate-200 "
          >
            most comments
          </button>
        </div>
      </div>
    </div>
  );
};
export default SortBy;

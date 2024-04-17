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
    <div className="relative z-50 mt-4 flex items-center gap-4 text-lg text-custom-text">
      <div className="text-lg">Sort by:</div>
      <div>
        <button
          onClick={toggleSortList}
          className="flex items-center rounded-lg border border-custom-text bg-custom-primary/50 px-4 py-1"
        >
          {searchParams.get("sortBy")
            ? searchParams.get("sortBy") === "likes"
              ? "Most likes"
              : "Most comments"
            : "Disabled"}
          <span className="icon-[mdi--arrow-down-drop-circle-outline] ml-2 text-xl"></span>
        </button>
        <div
          ref={sortList}
          className="absolute flex hidden flex-col gap-2 border border-custom-text bg-white p-2 shadow-lg"
        >
          <button
            onClick={() => handleOnOptionClick("sortBy", "likes")}
            className="hover:bg-custom-secondary-light px-1 text-start"
          >
            Most likes
          </button>
          <button
            onClick={() => handleOnOptionClick("sortBy", "comments")}
            className="hover:bg-custom-secondary-light px-1 text-start "
          >
            Most comments
          </button>
        </div>
      </div>
    </div>
  );
};
export default SortBy;

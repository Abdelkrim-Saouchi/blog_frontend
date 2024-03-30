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
        <button
          onClick={toggleSortList}
          className=" flex items-center rounded-lg bg-custom-accent px-4 py-1"
        >
          {searchParams.get("sortBy")
            ? searchParams.get("sortBy") === "likes"
              ? "Most likes"
              : "Most comments"
            : "None"}
          <span className="icon-[ic--outline-keyboard-arrow-down]"></span>
        </button>
        <div
          ref={sortList}
          className="absolute flex hidden flex-col gap-2 border bg-white p-2"
        >
          <button
            onClick={() => handleOnOptionClick("sortBy", "likes")}
            className="px-1 text-start hover:bg-custom-secondary-light"
          >
            Most likes
          </button>
          <button
            onClick={() => handleOnOptionClick("sortBy", "comments")}
            className="px-1 text-start hover:bg-custom-secondary-light "
          >
            Most comments
          </button>
        </div>
      </div>
    </div>
  );
};
export default SortBy;

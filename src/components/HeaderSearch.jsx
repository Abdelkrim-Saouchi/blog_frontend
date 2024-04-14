import { Link, useLocation } from "react-router-dom";

const HeaderSearch = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/search" && (
        <Link
          to="/search"
          className="flex w-2/3 items-center rounded-lg border border-custom-text bg-custom-secondary/40 px-2 py-1 text-custom-text md:w-1/3 md:px-6 md:py-2"
        >
          <span className="icon-[mdi--search] text-2xl text-custom-text"></span>
          <div className="bg-inherit/40 w-full pl-2 text-xl tracking-wider md:pl-4">
            Search
          </div>
        </Link>
      )}
    </>
  );
};
export default HeaderSearch;

import { useNavigation, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

const PaginationBar = ({ totalPages, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const busy = navigation.state === "loading";

  const handleChangePage = (key, value) => {
    setSearchParams((prevParams) => {
      if (value == null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handleChangePage("p", i)}
        disabled={i === currentPage || busy}
        className={
          i === currentPage
            ? "border border-custom-text bg-custom-accent px-4 py-1"
            : "border border-custom-text px-4 py-1 "
        }
      >
        {i}
      </button>,
    );
  }
  return (
    <div className="mb-6 mt-auto block">
      <div className="border-collapse">{buttons}</div>
    </div>
  );
};

PaginationBar.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
};
export default PaginationBar;

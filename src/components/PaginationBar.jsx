import { Form, useNavigation, useSubmit } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const PaginationBar = ({ totalPages, currentPage }) => {
  const [query, setQuery] = useState(currentPage);
  const submit = useSubmit();
  const navigation = useNavigation();
  const busy = navigation.state === "loading";

  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={(e) => {
          setQuery(e.target.textContent);
        }}
        disabled={i === currentPage || busy}
        className={
          i === currentPage
            ? "border bg-slate-400 px-4 py-1"
            : "border px-4 py-1 "
        }
      >
        {i}
      </button>,
    );
  }
  return (
    <div className="mt-4">
      <Form>
        <input
          hidden
          type="search"
          name="p"
          value={query}
          onChange={(e) => submit(e.currentTarget.form)}
        />
        {buttons}
      </Form>
    </div>
  );
};

PaginationBar.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
};
export default PaginationBar;

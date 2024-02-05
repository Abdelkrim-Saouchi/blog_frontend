import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ token, logout }) => {
  return (
    <header className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 px-4 py-2">
      <Link to="/">
        <span className="icon-[game-icons--bookmarklet] text-4xl"></span>
      </Link>
      <div className="flex items-center rounded-lg border border-gray-100 bg-gray-100 p-2">
        <span className="icon-[mdi--search] text-2xl text-gray-600"></span>
        <input
          type="search"
          placeholder="Search"
          className="bg-gray-100 pl-3 outline-none focus:outline-none"
        />
      </div>
      <nav>
        <ul className="flex gap-4 font-semibold">
          {!token && (
            <>
              <li>
                <Link to="/login" className="hover:opacity-70 ">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/singup" className="hover:opacity-70 ">
                  Sign up
                </Link>
              </li>
            </>
          )}
          {token && (
            <li>
              <button className="hover:opacity-70" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.any,
  logout: PropTypes.func,
};

export default Header;

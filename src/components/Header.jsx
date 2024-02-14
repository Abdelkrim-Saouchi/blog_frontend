import PropTypes from "prop-types";
import { useRef } from "react";
import { Link, useFetcher } from "react-router-dom";

const Header = ({ token }) => {
  const menuRef = useRef(null);
  const fetcher = useFetcher();

  const toggleMenu = () => {
    menuRef.current.classList.toggle("hidden");
  };

  return (
    <header className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 px-2 py-2 md:px-4">
      <Link to="/">
        <span className="icon-[game-icons--bookmarklet] text-3xl"></span>
      </Link>
      <div className="flex w-2/3 items-center rounded-lg border border-gray-100 bg-gray-100 p-2 md:w-auto">
        <span className="icon-[mdi--search] text-2xl text-gray-600"></span>
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-gray-100 pl-3 outline-none focus:outline-none"
        />
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-6 font-semibold">
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
              <fetcher.Form method="post" action="/">
                <button className="flex items-center gap-1 hover:opacity-70">
                  Logout
                  <span className="icon-[mdi--exit-run] text-xl"></span>
                </button>
              </fetcher.Form>
            </li>
          )}
        </ul>
      </nav>
      <div className="md:hidden">
        <span
          onClick={toggleMenu}
          className="icon-[mdi--hamburger-menu] text-3xl"
        ></span>
      </div>
      <nav
        ref={menuRef}
        className="absolute right-4 top-10 z-10 rounded border border-slate-200 bg-white px-4 py-4 shadow-md md:hidden "
      >
        <ul className="flex flex-col gap-4 font-semibold">
          {!token && (
            <>
              <li onClick={toggleMenu} className="p-2 hover:bg-slate-200">
                <Link to="/login">Login</Link>
              </li>
              <li onClick={toggleMenu} className="p-2 hover:bg-slate-200">
                <Link to="/singup">Sign up</Link>
              </li>
            </>
          )}
          {token && (
            <li onClick={toggleMenu} className="p-2 hover:bg-slate-200">
              <fetcher.Form method="post" action="/">
                <button className="flex items-center gap-1 hover:opacity-70">
                  Logout
                  <span className="icon-[mdi--exit-run] text-xl"></span>
                </button>
              </fetcher.Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.any,
};

export default Header;

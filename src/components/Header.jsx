import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useFetcher, useLocation } from "react-router-dom";

const Header = ({ token }) => {
  const menuRef = useRef(null);
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    // menuRef.current.classList.toggle("hidden");
    setOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("touchend", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideClick);

    () => {
      document.removeEventListener("touchend", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
      return;
    };
  }, []);

  return (
    <header className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 bg-custom-bg px-2 py-4 text-custom-text md:px-8">
      <Link to="/" className="flex items-center gap-2">
        <span className="icon-[game-icons--bookmarklet] text-2xl md:text-3xl"></span>
        <h1 className="text-lg font-bold md:text-2xl">MyBlog</h1>
      </Link>
      {location.pathname !== "/search" && (
        <Link
          to="/search"
          className="flex w-2/3 items-center rounded-lg border border-gray-100 bg-custom-secondary-light p-1 text-custom-text  md:w-1/3 md:p-2"
        >
          <span className="icon-[mdi--search] text-2xl text-gray-600"></span>
          <div className="w-full bg-gray-100 bg-inherit pl-3">Search</div>
        </Link>
      )}
      <nav className="hidden md:block">
        <ul className="flex gap-9 font-semibold">
          {!token && (
            <>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:opacity-70 "
                >
                  Home
                  <span className="icon-[ph--house] text-xl"></span>
                </Link>
              </li>
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
            <>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:opacity-70 "
                >
                  Home
                  <span className="icon-[ph--house] text-xl"></span>
                </Link>
              </li>
              <li>
                <a
                  href="https://author-krimo-blog.netlify.app/"
                  target="_blank"
                  className="flex items-center gap-1 hover:opacity-70 "
                >
                  Write
                  <span className="icon-[ph--note-pencil-thin] text-xl"></span>
                </a>
              </li>
              <li>
                <fetcher.Form method="post" action="/">
                  <button className="flex items-center gap-1 hover:opacity-70">
                    Logout
                    <span className="icon-[mdi--exit-run] text-xl"></span>
                  </button>
                </fetcher.Form>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="md:hidden">
        <span
          onClick={toggleMenu}
          className="icon-[mdi--hamburger-menu] text-2xl md:text-3xl"
        ></span>
      </div>
      {open && (
        <nav
          ref={menuRef}
          className="absolute right-4 top-10 z-10 rounded border border-slate-200 bg-white px-4 py-4 shadow-md md:hidden "
        >
          <ul className="flex flex-col gap-4 font-semibold">
            {!token && (
              <>
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-1 hover:opacity-70 "
                  >
                    Home
                    <span className="icon-[ph--house] text-xl"></span>
                  </Link>
                </li>
                <li onClick={toggleMenu} className="hover:bg-slate-200">
                  <Link to="/login">Login</Link>
                </li>
                <li onClick={toggleMenu} className="hover:bg-slate-200">
                  <Link to="/singup">Sign up</Link>
                </li>
              </>
            )}
            {token && (
              <>
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-1 hover:opacity-70 "
                  >
                    Home
                    <span className="icon-[ph--house] text-xl"></span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://author-krimo-blog.netlify.app/"
                    target="_blank"
                    className="flex items-center gap-1 hover:opacity-70 "
                  >
                    Write
                    <span className="icon-[ph--note-pencil-thin] text-xl"></span>
                  </a>
                </li>
                <li className="hover:bg-slate-200">
                  <fetcher.Form method="post" action="/">
                    <button className="flex items-center gap-1 hover:opacity-70">
                      Logout
                      <span className="icon-[mdi--exit-run] text-lg"></span>
                    </button>
                  </fetcher.Form>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.any,
};

export default Header;

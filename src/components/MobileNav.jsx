import PropTypes from "prop-types";
import { NavLink, useFetcher } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const MobileNav = ({ token }) => {
  const menuRef = useRef(null);
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
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
    <>
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
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "relative after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-xl after:bg-custom-accent"
                    : ""
                }
              >
                Home
              </NavLink>
            </li>
            {!token && (
              <>
                <li onClick={toggleMenu} className="">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "relative after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-xl after:bg-custom-accent"
                        : ""
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li onClick={toggleMenu} className="">
                  <NavLink
                    to="/singup"
                    className={({ isActive }) =>
                      isActive
                        ? "relative after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-xl after:bg-custom-accent"
                        : ""
                    }
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <>
                <li>
                  <a
                    href="https://author-krimo-blog.netlify.app/"
                    target="_blank"
                    className="flex items-center gap-1 "
                  >
                    Write
                  </a>
                </li>
                <li className="">
                  <fetcher.Form method="post" action="/">
                    <button className="rounded-full bg-custom-accent px-4 py-1 font-medium text-custom-bg">
                      Logout
                    </button>
                  </fetcher.Form>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

MobileNav.propTypes = {
  token: PropTypes.any,
};
export default MobileNav;

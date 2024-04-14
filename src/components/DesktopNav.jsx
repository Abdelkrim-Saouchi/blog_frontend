import { NavLink, useFetcher } from "react-router-dom";
import PropTypes from "prop-types";

const DesktopNav = ({ token }) => {
  const fetcher = useFetcher();
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-9">
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
            <li>
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
            <li>
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
                className={({ isActive }) =>
                  isActive
                    ? "relative after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-xl after:bg-custom-accent"
                    : ""
                }
              >
                Write
              </a>
            </li>
            <li>
              <fetcher.Form method="post" action="/">
                <button className="rounded-full bg-custom-accent px-6 py-2 font-medium text-custom-bg">
                  Logout
                </button>
              </fetcher.Form>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

DesktopNav.propTypes = {
  token: PropTypes.any,
};
export default DesktopNav;

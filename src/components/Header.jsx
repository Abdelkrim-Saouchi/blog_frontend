import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useFetcher, useLocation } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header = ({ token }) => {
  return (
    <header className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 bg-custom-bg px-2 py-4 text-custom-text md:px-12">
      <Link to="/" className="flex items-center gap-4">
        <span className="icon-[brandico--blogger] text-2xl text-custom-accent"></span>
        <h1 className="text-lg font-bold md:text-2xl">MYBLOG</h1>
      </Link>
      <HeaderSearch />
      <DesktopNav token={token} />
      <MobileNav token={token} />
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.any,
};

export default Header;

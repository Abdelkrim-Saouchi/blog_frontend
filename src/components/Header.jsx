const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 px-4 py-2">
      <span className="icon-[game-icons--bookmarklet] text-4xl"></span>
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
          <li>
            <a href="#" className="hover:opacity-70 ">
              Login
            </a>
          </li>
          <li>
            <a href="#" className="hover:opacity-70 ">
              Sign up
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 px-4 py-2">
      <span className="icon-[game-icons--bookmarklet] text-4xl"></span>
      <div className="flex items-center rounded-lg border border-gray-100 bg-gray-100 p-2">
        <span className="icon-[mdi--search] text-2xl text-gray-600"></span>
        <input
          type="search"
          className="bg-gray-100 outline-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Header;

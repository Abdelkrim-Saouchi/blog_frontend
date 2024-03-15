import { Form } from "react-router-dom";

const SearchPage = () => {
  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <Form className="flex flex-col gap-2">
        <label className="text-2xl font-semibold">
          Search articles by title:
        </label>
        <div className="flex w-2/3 items-center rounded-lg border border-gray-100 bg-gray-100 p-2 text-gray-600 focus-within:ring md:w-1/3">
          <span className="icon-[mdi--search] text-2xl text-gray-600"></span>
          <input
            type="search"
            name="search"
            placeholder="Title"
            className="ml-2 w-full bg-gray-100 outline-none focus:outline-none"
          />
        </div>
      </Form>
    </main>
  );
};
export default SearchPage;

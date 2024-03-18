import { useEffect } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { searchArticles } from "../api/searchArticles";
import ArticleCard from "../components/ArticleCard";
import useAutoLogout from "../hooks/useAutoLogout";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const data = await searchArticles(search);
  return { search, articles: data.articles };
};

const SearchPage = () => {
  const { search, articles } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("search");

  // logout automatically if user token expired
  useAutoLogout();

  useEffect(() => {
    document.getElementById("search").value = search;
  }, [search]);

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <Form className="flex flex-col gap-2">
        <label className="text-2xl font-semibold">
          Search articles by title:
        </label>
        <div className="flex  items-center rounded-lg border border-gray-100 bg-gray-100 p-2 text-gray-600 focus-within:ring md:w-1/3">
          {!searching ? (
            <span className="icon-[mdi--search] text-2xl text-gray-600"></span>
          ) : (
            <span className="icon-[ph--spinner-gap-light] animate-spin text-2xl text-gray-600"></span>
          )}
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Title"
            defaultValue={search}
            onChange={(e) => {
              const isFirstSearch = search == null;
              submit(e.currentTarget.form, { replace: !isFirstSearch });
            }}
            className="ml-2 w-full bg-gray-100 outline-none focus:outline-none"
          />
        </div>
      </Form>
      <p className="mt-2 font-semibold">Results: {articles.length}</p>
      <hr />
      <div className="pt-4">
        {articles.map((article) => (
          <ArticleCard key={article._id} post={article} />
        ))}
      </div>
    </main>
  );
};
export default SearchPage;

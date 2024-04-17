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
import PaginationBar from "../components/PaginationBar";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search =
    url.searchParams.get("search") === ""
      ? null
      : url.searchParams.get("search");
  const p = url.searchParams.get("p") || 1;
  const data = await searchArticles(search, p);
  return {
    search,
    articles: data.articles,
    currentPage: p,
    totalPages: data.totalPages,
  };
};

const SearchPage = () => {
  const { search, articles, currentPage, totalPages } = useLoaderData();
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
    <main className="min-h-dvh bg-custom-bg px-4 py-2 pt-4 text-custom-text md:px-40">
      <h2 className="my-6 text-2xl font-bold">Search articles:</h2>
      <Form className="mb-6 flex flex-wrap items-center gap-6">
        <label className="text-xl font-semibold">By title:</label>
        <div className="flex items-center rounded-lg border border-custom-text bg-custom-secondary/40 px-4 text-custom-text focus-within:ring md:w-1/3">
          {!searching ? (
            <span className="icon-[mdi--search] text-2xl text-custom-text"></span>
          ) : (
            <span className="icon-[ph--spinner-gap-light] animate-spin text-2xl text-custom-accent"></span>
          )}
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Articles's title"
            defaultValue={search}
            onChange={(e) => {
              const isFirstSearch = search == null;
              submit(e.currentTarget.form, { replace: !isFirstSearch });
            }}
            className="ml-2 w-full bg-transparent px-4 py-2 outline-none focus:outline-none"
          />
        </div>
      </Form>
      <p className="mb-6 mt-2 font-semibold text-custom-accent">
        Results: {articles.length}
      </p>
      {searching && (
        <span className="icon-[ph--spinner-gap-light] animate-spin text-5xl text-custom-accent"></span>
      )}
      <div className="mb-6 pt-4">
        {!searching &&
          articles.map((article) => (
            <ArticleCard key={article._id} post={article} />
          ))}
      </div>
      {!searching && articles.length > 0 && (
        <PaginationBar
          currentPage={Number(currentPage)}
          totalPages={Number(totalPages)}
        />
      )}
    </main>
  );
};
export default SearchPage;

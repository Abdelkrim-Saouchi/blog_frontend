import { Link, useLoaderData } from "react-router-dom";
import { getArticles } from "../api/getArticles";
import ArticleCard from "../components/ArticleCard";
import useAutoLogout from "../hooks/useAutoLogout";
import PaginationBar from "../components/PaginationBar";
import SortBy from "../components/SortBy";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  // if there no search param set page number to 1
  const p = url.searchParams.get("p") || 1;
  const sortBy = url.searchParams.get("sortBy");
  const data = await getArticles(p, sortBy);
  return { ...data, currentPage: p };
};

const Home = () => {
  const { articles, totalPages, currentPage } = useLoaderData();
  // logout automatically if user token expired
  useAutoLogout();

  return (
    <main className="min-h-dvh bg-custom-bg px-4 py-2 pt-4 text-custom-text md:px-40">
      <div className="my-6 flex items-center gap-6 pb-4">
        <span className="icon-[mdi--stars-outline] text-2xl text-custom-accent"></span>
        <Link
          to="/"
          className="relative text-lg font-bold text-custom-text after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:rounded-xl after:bg-custom-accent"
        >
          All
        </Link>
        <Link to="/filter" className="text-lg font-bold">
          Topics
        </Link>
      </div>
      <SortBy />
      <hr className="my-6" />
      <div className="mb-6 flex flex-col gap-6">
        {articles.map((article) => (
          <ArticleCard key={article._id} post={article} />
        ))}
      </div>
      <PaginationBar
        totalPages={Number(totalPages)}
        currentPage={Number(currentPage)}
      />
    </main>
  );
};

export default Home;

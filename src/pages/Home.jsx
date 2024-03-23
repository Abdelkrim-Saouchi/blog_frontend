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
    <main className="px-4 py-2 pt-4 md:px-40">
      <div className="flex items-center gap-6 border-b border-gray-200 pb-4 opacity-70">
        <span className="icon-[ph--plus-thin]"></span>
        <Link to="/" className="font-bold">
          For you
        </Link>
        <Link to="/filter">Topics</Link>
      </div>
      <SortBy />
      <div className=" pt-8">
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

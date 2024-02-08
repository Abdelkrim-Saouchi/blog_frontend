import { useLoaderData } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

export const loader = async () => {
  const res = await fetch("http://localhost:3000/api/v1/posts", {
    method: "GET",
  });
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data;
  }
  return [];
};

const Home = () => {
  const articles = useLoaderData();

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <div className="flex items-center gap-6 border-b border-gray-200 pb-4 opacity-70">
        <span className="icon-[ph--plus-thin]"></span>
        <div className="font-bold">For you</div>
        <div>Topics</div>
      </div>
      <div className="pt-8">
        {articles.map((article) => (
          <ArticleCard key={article._id} post={article} />
        ))}
      </div>
    </main>
  );
};

export default Home;

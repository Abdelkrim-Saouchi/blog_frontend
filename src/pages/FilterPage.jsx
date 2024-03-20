import { Form, Link, useLoaderData, useNavigation } from "react-router-dom";
import { getTopics } from "../api/getTopics";
import { useEffect, useState } from "react";
import { filterArticles } from "../api/filterArticles";
import ArticleCard from "../components/ArticleCard";
import PaginationBar from "../components/PaginationBar";

export const loader = async ({ request }) => {
  const topicsData = await getTopics();
  const url = new URL(request.url);
  let topic =
    url.searchParams.get("topic") === "" ? null : url.searchParams.get("topic");
  const p = url.searchParams.get("p") || 1;
  const articles = await filterArticles(topic, p);
  return {
    topicsData,
    topic,
    currentPage: p,
    totalPages: articles.totalPages,
    articles: articles.articles,
  };
};

const FilterPage = () => {
  const { topicsData, topic, currentPage, articles, totalPages } =
    useLoaderData();
  const [topics, setTopics] = useState(topic?.split(";") || []);
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("topic");

  const handleChange = (e) => {
    if (topics.includes(e.target.value)) {
      e.target.classList.remove("bg-slate-200");
      setTopics((prev) => prev.filter((el) => el !== e.target.value));
      return;
    }
    e.target.classList.add("bg-slate-200");
    setTopics((prev) => [...prev, e.target.value]);
  };

  useEffect(() => {
    setTopics(topic?.split(";") || []);
  }, [topic]);

  return (
    <main className="space-y-4 px-4 py-2 pt-4 md:px-40">
      <div className="flex items-center gap-6 border-b border-gray-200 pb-4 opacity-70">
        <span className="icon-[ph--plus-thin]"></span>
        <Link to="/">For you</Link>
        <Link to="/filter" className="font-bold">
          Topics
        </Link>
      </div>
      <h2 className="text-2xl font-semibold">Filter articles by topics:</h2>
      <Form>
        <div className="my-4 flex gap-4 rounded border-2 border-slate-400 p-4 ">
          {topicsData.topics.map((topic) => (
            <button
              key={topic._id}
              onClick={handleChange}
              value={topic._id}
              className={
                topics.includes(topic._id)
                  ? " rounded-xl border bg-slate-200 p-2 shadow"
                  : " rounded-xl border p-2 shadow "
              }
            >
              {topic.name}
            </button>
          ))}
        </div>
        <input
          hidden
          type="search"
          name="topic"
          id="topic"
          defaultValue={topics.join(";")}
        />
      </Form>
      {searching && (
        <span className="icon-[ph--spinner-gap-light] animate-spin text-4xl text-gray-600"></span>
      )}
      <div>
        {!searching &&
          articles.map((article) => (
            <ArticleCard key={article._id} post={article} />
          ))}
      </div>

      {!searching && articles.length > 0 && (
        <PaginationBar
          totalPages={Number(totalPages)}
          currentPage={Number(currentPage)}
        />
      )}
    </main>
  );
};
export default FilterPage;

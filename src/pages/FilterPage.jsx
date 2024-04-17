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
    <main className="min-h-dvh space-y-4 bg-custom-bg px-4 py-2 pt-4 md:px-40">
      <div className="my-6 flex items-center gap-6 pb-4">
        <span className="icon-[mdi--stars-outline] text-2xl text-custom-accent"></span>
        <Link to="/" className="text-lg font-bold">
          All
        </Link>
        <Link
          to="/filter"
          className="relative text-lg font-bold text-custom-text after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:bg-custom-accent"
        >
          Topics
        </Link>
      </div>
      <h2 className="text-xl">Filter articles by topics:</h2>
      <Form>
        <div className="my-4 mb-8 flex gap-4 overflow-x-auto rounded-lg border-2 border-custom-text p-4">
          {topicsData.topics.map((topic) => (
            <button
              key={topic._id}
              onClick={handleChange}
              value={topic._id}
              className={
                topics.includes(topic._id)
                  ? "shadowder-custom-text min-w-max rounded-full border border-custom-text bg-custom-primary-lighten px-4 py-2 shadow"
                  : "shadowder-custom-text min-w-max rounded-full border border-custom-text bg-custom-secondary/40 px-4 py-2 shadow"
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
      <div className="mb-6 flex flex-col gap-6">
        {!searching &&
          articles.map((article) => (
            <ArticleCard key={article._id} post={article} />
          ))}
      </div>

      {!searching && articles.length > 0 && (
        <div className="mb-9">
          <PaginationBar
            totalPages={Number(totalPages)}
            currentPage={Number(currentPage)}
          />
        </div>
      )}
    </main>
  );
};
export default FilterPage;

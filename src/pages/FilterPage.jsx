import { Form, useLoaderData } from "react-router-dom";
import { getTopics } from "../api/getTopics";
import { useEffect, useState } from "react";
import { filterArticles } from "../api/filterArticles";
import ArticleCard from "../components/ArticleCard";

export const loader = async ({ request }) => {
  const topicsData = await getTopics();
  const url = new URL(request.url);
  let search = url.searchParams.get("search");
  if (search === "") {
    search = null;
  }
  const articles = await filterArticles(search);
  console.log("search:", search);
  return { topicsData, search, articles: articles.articles };
};

const FilterPage = () => {
  let { topicsData, search, articles } = useLoaderData();
  const [topics, setTopics] = useState(search?.split(";") || []);

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
    setTopics(search?.split(";") || []);
  }, [search]);

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <h2 className="text-2xl font-semibold">Filter articles by topics:</h2>
      <Form>
        <div className="my-4 flex gap-4 rounded border-2 border-slate-400 p-4 ">
          {topicsData.topics.map((topic) => (
            <button
              key={topic._id}
              onClick={handleChange}
              value={topic._id}
              className=" rounded-xl border p-2 shadow "
            >
              {topic.name}
            </button>
          ))}
        </div>
        <input
          hidden
          type="search"
          name="search"
          id="search"
          defaultValue={topics.join(";")}
        />
      </Form>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article._id} post={article} />
        ))}
      </div>
    </main>
  );
};
export default FilterPage;

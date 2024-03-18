import { Form, useLoaderData } from "react-router-dom";
import { getTopics } from "../api/getTopics";
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
  const data = await getTopics();
  const url = new URL(request.url);
  let search = url.searchParams.get("search");
  if (search === "") {
    search = null;
  }
  console.log("search:", search);
  return { data, search };
};

const FilterPage = () => {
  let { data, search } = useLoaderData();
  console.log("topics", data);
  const [topics, setTopics] = useState(search?.split(";") || []);
  console.log("inner topics:", topics);

  const handleChange = (e) => {
    const btnText = e.target.textContent;
    console.log("text:", btnText);
    if (topics.includes(e.target.textContent)) {
      e.target.classList.remove("bg-slate-200");
      setTopics((prev) => prev.filter((el) => el !== e.target.textContent));
      return;
    }
    e.target.classList.add("bg-slate-200");
    setTopics((prev) => [...prev, e.target.textContent]);
  };

  useEffect(() => {
    setTopics(search?.split(";") || []);
  }, [search]);

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <h2 className="text-2xl font-semibold">Filter articles by topics:</h2>
      <Form>
        <div className="my-4 flex gap-4 rounded border-2 border-slate-400 p-4 ">
          {data.topics.map((topic) => (
            <button
              key={topic._id}
              onClick={handleChange}
              className=" rounded-xl border p-2 shadow "
            >
              {topic.name}
            </button>
          ))}
        </div>
        <input
          type="search"
          name="search"
          id="search"
          defaultValue={topics.join(";")}
        />
      </Form>
    </main>
  );
};
export default FilterPage;

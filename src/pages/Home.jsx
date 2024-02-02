import ArticleCard from "../components/ArticleCard";

const Home = () => {
  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <div className="flex items-center gap-6 border-b border-gray-200 pb-4 opacity-70">
        <span className="icon-[ph--plus-thin]"></span>
        <div className="font-bold">For you</div>
        <div>Topics</div>
      </div>
      <div className="pt-8">
        <ArticleCard />
        <ArticleCard />
      </div>
    </main>
  );
};

export default Home;
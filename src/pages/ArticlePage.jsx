import LikesCommentsBar from "../components/LikesCommentsBar";

const ArticlePage = () => {
  return (
    <main className="flex flex-col items-center px-4 py-2 pt-4 text-xl">
      <div className="md:w-2/4">
        <h2 className="my-6 text-6xl font-bold">This is big title</h2>
        <div>
          <p className="font-bold">Krimothiazine</p>
          <div className="gap-2 text-gray-500">
            <span>7 min Read</span> . <span>Feb 08 2024</span>
          </div>
        </div>
        <LikesCommentsBar />
        <div className="leading-relaxed">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit
            ducimus odio ad ipsa, necessitatibus dolor voluptates doloremque
            reiciendis esse voluptatibus sint quis itaque doloribus assumenda,
            aliquid voluptate commodi. Numquam accusamus quos nulla ipsum,
            aperiam autem totam doloribus officiis porro dolores.
          </p>
        </div>
        <div className="my-8">
          <span className="rounded-lg bg-gray-100 p-2">Web Dev</span>
        </div>
        <LikesCommentsBar />
      </div>
    </main>
  );
};

export default ArticlePage;

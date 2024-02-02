const ArticleCard = () => {
  const post = {
    author: "Krimothiazine",
    title: "First article ever!",
    createdAt: "Fab 02, 2024",
    topic: "Web Dev",
    readTime: 3,
  };
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="">
        <span className="font-semibold ">{post.author}</span>
        <span className="ml-2 text-gray-500">{post.createdAt}</span>
      </div>
      <div className="pb-8 pt-2">
        <h2 className="text-2xl font-bold ">
          <a href="#">{post.title}</a>
        </h2>
      </div>
      <div>
        <span className="rounded-lg bg-gray-100 p-2">{post.topic}</span>
        <span className="ml-4 text-gray-500">{post.readTime} min read</span>
      </div>
    </div>
  );
};

export default ArticleCard;

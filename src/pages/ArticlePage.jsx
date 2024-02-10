import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import LikesCommentsBar from "../components/LikesCommentsBar";

export const loader = async ({ params }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/posts/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return new Error(`No data: ${res.statusText} ${res.status}`);
  } catch (err) {
    return err;
  }
};

const ArticlePage = () => {
  const article = useLoaderData();
  const [comments, setComments] = useState(article.comments);
  const [likes, setLikes] = useState(article.likes);

  return (
    <main className="flex flex-col items-center px-4 py-2 pt-4 text-xl">
      <div className="md:w-2/4">
        <h2 className="my-6 text-6xl font-bold">{article.title}</h2>
        <div>
          <p className="font-bold">
            {article.author.firstName} {article.author.lastName}
          </p>
          <div className="gap-2 text-gray-500">
            <span>{article.readTime} min read</span> .{" "}
            <span>{article.creationDate}</span>
          </div>
        </div>
        <LikesCommentsBar
          likesNumber={likes.length}
          commentsNumber={comments.length}
        />
        <div className="leading-relaxed">
          <p>{article.content}</p>
        </div>
        <div className="my-8">
          {article.topics.map((topic) => (
            <span key={topic._id} className="rounded-lg bg-gray-100 p-2">
              {topic.name}
            </span>
          ))}
        </div>
        <LikesCommentsBar
          likesNumber={likes.length}
          commentsNumber={comments.length}
        />
      </div>
    </main>
  );
};

export default ArticlePage;

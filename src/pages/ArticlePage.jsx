import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
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
  const [likeClicked, setLikeClicked] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("jwt-token");
  const [likeId, setLikeId] = useState(null);

  const addLike = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/posts/${id}/likes`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setLikeId(data.likeId);
        return data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const removeLike = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/posts/${id}/likes/${likeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const onLike = async () => {
    if (!likeClicked) {
      const data = await addLike();
      if (data) {
        setLikeClicked(true);
        return;
      }
    }
    const data = await removeLike();
    if (data) {
      setLikeClicked(false);
      return;
    }
  };

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
          likeClicked={likeClicked}
          onLike={onLike}
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
          likeClicked={likeClicked}
          onLike={onLike}
        />
      </div>
    </main>
  );
};

export default ArticlePage;

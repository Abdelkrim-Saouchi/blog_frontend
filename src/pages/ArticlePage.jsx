import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import LikesCommentsBar from "../components/LikesCommentsBar";
import { hostname } from "../globals/hostname";

export const loader = async ({ params }) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/${params.id}`);
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
  const [likeId, setLikeId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  const addLike = async () => {
    const token = localStorage.getItem("jwt-token");
    try {
      const res = await fetch(`${hostname}/api/v1/posts/${id}/likes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLikeId(data.likeId);
        return { data, success: true };
      }
      if (res.status === 403) {
        return { isExist: true };
      }
      return { success: false };
    } catch (err) {
      return null;
    }
  };

  const removeLike = async () => {
    const token = localStorage.getItem("jwt-token");
    try {
      const res = await fetch(
        `${hostname}/api/v1/posts/${id}/likes/${likeId}`,
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
        return { data, success: true };
      }
      return { success: false };
    } catch (err) {
      return null;
    }
  };

  const onLike = async () => {
    if (!likeClicked) {
      const data = await addLike();
      if (data?.success) {
        setLikeClicked(true);
        return;
      }

      if (data?.isExist) {
        return;
      }

      if (data?.success === false) {
        setErrorMsg("You must login to like");
        setError(true);
        return;
      }

      setErrorMsg("Some thing wrong happened. Try later.");
      setError(true);
      return;
    }
    const data = await removeLike();

    if (data?.success) {
      setLikeClicked(false);
      return;
    }
    if (data?.success === false) {
      setErrorMsg("You must login to remove like");
      setError(true);
      return;
    }

    setErrorMsg("Some thing wrong happened. Try later.");
    setError(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setError(false), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${hostname}/api/v1/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          setLikes(data.likes);
          setComments(data.comments);
          return;
        }
        return new Error(`No data: ${res.statusText} ${res.status}`);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticle();
  }, [likeClicked, id]);

  useEffect(() => {
    const fetchLike = async () => {
      const token = localStorage.getItem("jwt-token");
      try {
        const res = await fetch(`${hostname}/api/v1/posts/likes/status/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const { likeId } = await res.json();
          setLikeId(likeId);
          return setLikeClicked(true);
        }
        if (res.status === 404) {
          return setLikeClicked(false);
        }
        if (res.status === 401) {
          setLikeClicked(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLike();
  }, [id]);

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
          errorMsg={errorMsg}
          error={error}
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
          errorMsg={errorMsg}
          error={error}
        />
      </div>
    </main>
  );
};

export default ArticlePage;

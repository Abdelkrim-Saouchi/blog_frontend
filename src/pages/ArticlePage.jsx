import { useLoaderData } from "react-router-dom";
import { createLike } from "../api/createLike";
import { getArticle } from "../api/getArticle";
import { getLikeStatus } from "../api/getLikeStatus";
import { removeLike } from "../api/removeLike";
import CommentsSection from "../components/CommentsSection";
import LikesCommentsBar from "../components/LikesCommentsBar";

export const loader = async ({ params }) => {
  const article = await getArticle(params.id);
  const status = await getLikeStatus(params.id);
  return { article, likeClicked: status.likeClicked, likeId: status.likeId };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const token = localStorage.getItem("jwt-token");

  // create like on article
  if (formData.get("liked") === "no") {
    return await createLike(params.id, token);
  }

  // remove like on article
  if (formData.get("liked") === "yes") {
    const likeId = formData.get("likeId");

    return removeLike(params.id, likeId, token);
  }
};

const ArticlePage = () => {
  const { article } = useLoaderData();

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
          likesNumber={article.likes.length}
          commentsNumber={article.comments.length}
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
          likesNumber={article.likes.length}
          commentsNumber={article.comments.length}
        />
        <CommentsSection />
      </div>
    </main>
  );
};

export default ArticlePage;

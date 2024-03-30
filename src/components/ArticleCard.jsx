import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PseudoImage from "./PseudoImage";

const ArticleCard = ({ post }) => {
  return (
    <div className="mb-4 flex flex-col rounded-lg border-b border-gray-200 bg-custom-secondary-light px-4 py-6 text-custom-text md:flex-row">
      <div className="gap-3">
        <div className="flex items-center gap-2">
          <PseudoImage firstLetter={post.author.firstName[0].toUpperCase()} />
          <span className="font-semibold ">
            {post.author.firstName + " " + post.author.lastName}
          </span>
          <span className="text-gray-500">{post.creationDate}</span>
        </div>
        <div className="py-2">
          <h2 className="text-2xl font-bold hover:text-custom-accent">
            <Link to={`/articles/${post._id}`}>{post.title}</Link>
          </h2>
        </div>
        <div className="my-2 mb-4 flex items-center gap-3">
          <span className="flex items-center gap-2 ">
            <span className="icon-[mdi--like]"></span> {post.likes.length}
          </span>
          <span className="flex items-center gap-2 ">
            <span className="icon-[mdi--comment-outline]"></span>{" "}
            {post.comments.length}
          </span>
        </div>
        <div className="hidden md:block">
          {post.topics.map((topic) => (
            <span key={topic.name} className="rounded-lg bg-custom-primary p-2">
              {topic.name}
            </span>
          ))}
          <span className="ml-4 text-gray-500">{post.readTime} min read</span>
        </div>
      </div>
      {post.imgURL && (
        <img
          src={post.imgURL}
          alt="article"
          className="mt-auto size-40 object-contain md:ml-auto"
        />
      )}
      <div className="mt-auto p-4 md:hidden">
        {post.topics.map((topic) => (
          <span key={topic.name} className="rounded-lg bg-custom-primary p-2">
            {topic.name}
          </span>
        ))}
        <span className="ml-4 text-gray-500">{post.readTime} min read</span>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  post: PropTypes.object,
};

export default ArticleCard;

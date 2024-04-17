import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PseudoImage from "./PseudoImage";

const ArticleCard = ({ post }) => {
  return (
    <div className="mb-4 flex flex-col rounded-lg border-2 border-custom-text bg-custom-primary-lighten px-4 py-6 text-custom-text md:flex-row  md:drop-shadow-3xl">
      <div className="gap-3">
        <div className="flex items-center gap-2">
          <PseudoImage firstLetter={post.author.firstName[0].toUpperCase()} />
          <span className="font-semibold ">
            {post.author.firstName + " " + post.author.lastName}
          </span>
          <span className="text-custom-accent-darken">{post.creationDate}</span>
        </div>
        <div className="py-2">
          <h2 className="text-2xl font-bold hover:text-custom-accent">
            <Link to={`/articles/${post._id}`}>{post.title}</Link>
          </h2>
        </div>
        <div className="my-2 flex items-center gap-3">
          <span className="flex items-center gap-2 ">
            <span className="icon-[mdi--like]"></span> {post.likes.length}
          </span>
          <span className="flex items-center gap-2 ">
            <span className="icon-[mdi--comment]"></span>
            {post.comments.length}
          </span>
        </div>
        <div className="mb-4 text-custom-accent-darken">
          {post.readTime} min read
        </div>
        <div className="hidden md:block">
          {post.topics.map((topic) => (
            <span
              key={topic.name}
              className="rounded-full border border-custom-text bg-custom-secondary/40 px-4 py-2"
            >
              {topic.name}
            </span>
          ))}
        </div>
      </div>
      {post.imgURL && (
        <img
          src={post.imgURL}
          alt="article"
          className="mb-4 mt-auto size-40 object-contain md:ml-auto"
        />
      )}
      <div className="mt-auto md:hidden">
        {post.topics.map((topic) => (
          <span
            key={topic.name}
            className="rounded-full border border-custom-text bg-custom-secondary/50 px-4 py-2"
          >
            {topic.name}
          </span>
        ))}
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  post: PropTypes.object,
};

export default ArticleCard;

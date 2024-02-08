import PropTypes from "prop-types";

const ArticleCard = ({ post }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="">
        <span className="font-semibold ">
          {post.author.firstName + " " + post.author.lastName}
        </span>
        <span className="ml-2 text-gray-500">{post.createdAt}</span>
      </div>
      <div className="pb-8 pt-2">
        <h2 className="text-2xl font-bold ">
          <a href="#">{post.title}</a>
        </h2>
      </div>
      <div>
        {post.topics.map((topic) => (
          <span key={topic.name} className="rounded-lg bg-gray-100 p-2">
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

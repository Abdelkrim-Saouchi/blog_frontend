import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  return (
    <div className="rounded border border-gray-200 p-3">
      <div className="flex gap-2 text-lg">
        <div className="font-bold">{comment.author.username}</div>
        <div className="text-gray-500">{comment.creationDate}</div>
      </div>
      <div>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;

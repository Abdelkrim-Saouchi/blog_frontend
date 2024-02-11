import PropTypes from "prop-types";

const LikesCommentsBar = ({
  likesNumber,
  commentsNumber,
  likeClicked,
  onLike,
  errorMsg,
  error,
}) => {
  return (
    <div className="relative my-8 flex gap-4 border-b border-t border-gray-200 p-3">
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <button className="flex items-center" onClick={onLike}>
          {likeClicked ? (
            <span className="icon-[mdi--like]"></span>
          ) : (
            <span className="icon-[mdi--like-outline]"></span>
          )}
        </button>
        {likesNumber}
      </div>
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <button className="flex items-center">
          <span className="icon-[mdi--comment-outline]"></span>
        </button>
        {commentsNumber}
      </div>
      {error && (
        <div className="absolute -bottom-10 z-10 rounded-lg border border-red-600 bg-white p-3 text-sm text-red-600 shadow-lg">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

LikesCommentsBar.propTypes = {
  likesNumber: PropTypes.number,
  commentsNumber: PropTypes.number,
  likeClicked: PropTypes.bool,
  onLike: PropTypes.func,
  errorMsg: PropTypes.string,
  error: PropTypes.bool,
};

export default LikesCommentsBar;

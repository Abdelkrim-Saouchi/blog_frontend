import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useFetcher, useParams } from "react-router-dom";

const LikesCommentsBar = ({ likesNumber, commentsNumber }) => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const fetcher = useFetcher();
  const liked = fetcher.formData
    ? fetcher.formData.get("liked") === "no"
    : fetcher.data?.likeClicked;

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(`/articles/${id}`);
    }
  }, [fetcher, id]);

  useEffect(() => {
    if (fetcher.data) {
      setError(fetcher.data.isLoginError);
    }
  }, [fetcher]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="relative my-8 flex gap-4 border-b border-t border-gray-200 p-3">
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <fetcher.Form method="post" action={`/articles/${id}`}>
          <button
            className="flex items-center"
            name="liked"
            value={liked ? "yes" : "no"}
          >
            {liked ? (
              <span className="icon-[mdi--like]"></span>
            ) : (
              <span className="icon-[mdi--like-outline]"></span>
            )}
          </button>
          {liked && (
            <input
              hidden
              id="likeId"
              name="likeId"
              defaultValue={fetcher.data?.likeId || ""}
            />
          )}
        </fetcher.Form>
        {likesNumber}
      </div>
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <a href="#comments" className="flex items-center">
          <span className="icon-[mdi--comment-outline]"></span>
        </a>
        {commentsNumber}
      </div>
      {error && (
        <div className="absolute -bottom-10 z-10 rounded-lg border border-red-600 bg-white p-3 text-sm text-red-600 shadow-lg">
          You must login first!
        </div>
      )}

      {fetcher.data?.isServerError && (
        <div className="absolute -bottom-10 z-10 rounded-lg border border-red-600 bg-white p-3 text-sm text-red-600 shadow-lg">
          Server Error. Try later!
        </div>
      )}
    </div>
  );
};

LikesCommentsBar.propTypes = {
  likesNumber: PropTypes.number,
  commentsNumber: PropTypes.number,
};

export default LikesCommentsBar;

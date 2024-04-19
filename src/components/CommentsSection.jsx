import PropTypes from "prop-types";
import {
  Link,
  useFetcher,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Comment from "./Comment";

const CommentsSection = ({ comments }) => {
  const { id } = useParams();
  const { token } = useOutletContext();
  const fetcher = useFetcher();
  const busy = fetcher.state === "submitting";
  const isOk = fetcher.data ? fetcher.data.ok : true;

  return (
    <section className="pb-9 text-custom-text" id="comments">
      <h3 className="mb-4 text-xl font-bold md:text-2xl">
        Leave a comment ...
      </h3>
      {token && (
        <fetcher.Form
          method="post"
          action={`/articles/${id}`}
          className="mb-6 flex resize-y flex-col gap-2"
        >
          <textarea
            name="commentText"
            id="comment"
            rows="5"
            className="mb-4 rounded border border-custom-text p-3 shadow-lg"
            required
            disabled={busy}
          ></textarea>
          <button
            type="submit"
            name="commentBtn"
            value="create"
            disabled={busy}
            className="flex items-center gap-2 self-start rounded-lg border border-custom-text bg-custom-secondary/40 px-4 py-3 hover:bg-custom-accent "
          >
            {busy ? (
              <>
                <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
                Submitting
              </>
            ) : (
              "Submit"
            )}
          </button>
        </fetcher.Form>
      )}

      {!token && (
        <div className="mb-4 flex flex-col rounded border border-custom-text p-3 text-center text-red-600">
          <p className="mb-4">
            You are not log in. You must log in to comment this article
          </p>
          <Link
            to="/login"
            className="block w-fit self-center rounded-full border border-custom-text bg-custom-secondary/40 p-2 px-8 text-custom-text hover:bg-custom-accent"
          >
            Log in
          </Link>
        </div>
      )}

      {!isOk && (
        <p className="mb-4 text-red-600">
          Something wrong happened! Try later.
        </p>
      )}

      <h3 className="mt-4 text-xl font-bold md:text-2xl">Comments:</h3>
      {comments.length === 0 && (
        <p className="my-4 italic text-gray-400">No comments</p>
      )}
      <hr className="mb-8 mt-2 border" />
      <div className="bg-custom-secondary-light mb-6 flex flex-col gap-4 rounded-lg shadow-lg">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

CommentsSection.propTypes = {
  comments: PropTypes.array,
};

export default CommentsSection;

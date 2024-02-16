import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentsSection = () => {
  return (
    <div>
      <form method="post" className="mb-6 flex resize-y flex-col gap-2">
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="5"
          className="rounded border border-gray-200 p-3"
        >
          {" "}
        </textarea>
        <button
          type="submit"
          className="self-start rounded bg-black p-3 text-white"
        >
          Submit
        </button>
      </form>

      <div className="mb-6 flex flex-col gap-4">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

CommentsSection.propTypes = {};

export default CommentsSection;

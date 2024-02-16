import PropTypes from "prop-types";

const Comment = () => {
  return (
    <div className="rounded border border-gray-200 p-3">
      <div className="flex gap-2 text-lg">
        <div className="font-bold">User01</div>
        <div className="text-gray-500">16 Feb</div>
      </div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime a esse
        culpa sint sit voluptatibus.
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;

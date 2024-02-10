const LikesCommentsBar = () => {
  return (
    <div className="my-8 flex gap-4 border-b border-t border-gray-200 p-3">
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <span className="icon-[mdi--like-outline] "></span>0
      </div>
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <span className="icon-[mdi--comment-outline]"></span>0
      </div>
    </div>
  );
};

export default LikesCommentsBar;

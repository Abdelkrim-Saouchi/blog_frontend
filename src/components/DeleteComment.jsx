import { Form, useNavigate, useNavigation } from "react-router-dom";
import { deleteComment } from "../api/deleteComment";

export const action = async ({ params }) => {
  const { id, commentId } = params;
  const token = localStorage.getItem("jwt-token");

  return await deleteComment(id, commentId, token);
};

const DeleteComment = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  const cancel = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="fixed z-10 flex flex-col items-center justify-center gap-4 rounded border border-custom-text bg-custom-secondary/40 p-4 text-custom-text shadow-lg">
      <p className="text-2xl font-bold">Are you sure to delete this comment?</p>
      <div className="flex justify-center gap-2">
        <Form method="post">
          <button
            name="commentBtn"
            value="delete"
            disabled={busy}
            className="flex items-center gap-2 rounded-lg border border-custom-text bg-custom-primary p-2 "
          >
            {busy ? (
              <>
                <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
                Processing
              </>
            ) : (
              "Yes"
            )}
          </button>
        </Form>
        <button
          onClick={cancel}
          className="rounded-lg border border-custom-text bg-custom-accent p-2"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteComment;

import { hostname } from "../globals/hostname";

export const removeLike = async (id, likeId, token) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/${id}/likes/${likeId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();

      return { data, likeClicked: false };
    }

    return { likeClicked: false, isServerError: true };
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Remove like failed!",
    });
  }
};

import { hostname } from "../globals/hostname";

export const createLike = async (id, token) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/${id}/likes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      data.likeClicked = true;
      return data;
    }
    if (res.status === 403) {
      return { likeClicked: true };
    }
    return { likeClicked: false, isLoginError: true };
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Create like failed.",
    });
  }
};

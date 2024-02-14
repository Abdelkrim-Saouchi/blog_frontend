import { hostname } from "../globals/hostname";

export const getLikeStatus = async (id) => {
  const token = localStorage.getItem("jwt-token");
  try {
    const res = await fetch(`${hostname}/api/v1/posts/likes/status/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const { likeId } = await res.json();
      return { likeClicked: true, likeId: likeId };
    }
    if (res.status === 404) {
      return { likeClicked: false };
    }
    if (res.status === 401) {
      return { likeClicked: false };
    }
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Get like status failed!",
    });
  }
};

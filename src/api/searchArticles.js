import { hostname } from "../globals/hostname";

export const searchArticles = async (search) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/search/post?q=${search}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Search articles failed",
    });
  }
};

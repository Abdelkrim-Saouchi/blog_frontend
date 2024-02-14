import { hostname } from "../globals/hostname";

export const getArticle = async (id) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Response("", { status: 404, statusText: "fetch gets No data." });
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Fetch failed from sever error.",
    });
  }
};

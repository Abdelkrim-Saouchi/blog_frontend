import { hostname } from "../globals/hostname";

export const searchArticles = async (search, page) => {
  let searchString;
  if (search == null) {
    searchString = "";
  } else {
    searchString = `q=${search}&`;
  }
  try {
    const res = await fetch(
      `${hostname}/api/v1/posts/search/post?${searchString}p=${page}`,
    );
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

import { hostname } from "../globals/hostname";

export const filterArticles = async (topic, page) => {
  let topicString;
  if (topic == null) {
    topicString = "";
  } else {
    topicString = `q=${topic}&`;
  }
  try {
    const res = await fetch(
      `${hostname}/api/v1/posts/filter/post?${topicString}p=${page}`,
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

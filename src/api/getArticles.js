import { hostname } from "../globals/hostname";

export const getArticles = async (p, sortBy) => {
  console.log('sortBy', sortBy);
  try {
    const res = await fetch(
      `${hostname}/api/v1/posts/public?p=${p}&sortBy=${sortBy}`,
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Response("No data", { status: res.status });
  } catch (err) {
    throw new Response("", {
      status: 404,
      statusText: "Fetch failed. No data",
    });
  }
};

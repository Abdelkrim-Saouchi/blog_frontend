import { Outlet, redirect, useLoaderData } from "react-router-dom";
import Header from "./Header";

export const loader = () => {
  const token = localStorage.getItem("jwt-token");
  return token;
};

export const action = async () => {
  localStorage.removeItem("jwt-token");
  return redirect("/");
};

const Root = () => {
  const token = useLoaderData();

  return (
    <>
      <Header token={token} />
      <Outlet />
    </>
  );
};

export default Root;

import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";

export const loader = () => {
  const token = localStorage.getItem("jwt-token");
  return token;
};

export const action = async () => {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("user-expiresIn");
  localStorage.removeItem("userId");
  return redirect("/");
};

const Root = () => {
  const jwtToken = useLoaderData();
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setToken(jwtToken);
  }, [jwtToken]);

  return (
    <>
      <Header token={token} />

      <div
        className={
          navigation.state === "loading" &&
          navigation.location.pathname !== "/search" && // prevent fading effect on search page
          navigation.location.pathname !== "/filter" // prevent fading effect on filter page
            ? "opacity-25 transition-opacity delay-200 duration-200"
            : ""
        }
      >
        <Outlet context={{ token, setToken }} />
      </div>
    </>
  );
};

export default Root;

import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Header from "./Header";

export const loader = () => {
  const token = localStorage.getItem("jwt-token");
  return token;
};

export const action = async () => {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("userId");
  return redirect("/");
};

const Root = () => {
  const token = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <Header token={token} />

      <div
        className={
          navigation.state === "loading"
            ? "opacity-25 transition-opacity delay-200 duration-200"
            : ""
        }
      >
        <Outlet context={token} />
      </div>
    </>
  );
};

export default Root;

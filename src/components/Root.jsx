import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Root = () => {
  const [token, setToken] = useState(null);

  const logout = () => {
    localStorage.removeItem("jwt-token");
    setToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <>
      <Header token={token} logout={logout} />
      <Outlet context={setToken} />
    </>
  );
};

export default Root;

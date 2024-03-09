import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const useAutoLogout = () => {
  const navigate = useNavigate();
  const { setToken } = useOutletContext();

  useEffect(() => {
    let expiresIn = localStorage.getItem("user-expiresIn");
    if (expiresIn) {
      expiresIn = Number(expiresIn);
      const now = Date.now();
      const remainingTime = expiresIn - now;
      if (remainingTime < 0) {
        localStorage.removeItem("jwt-token");
        localStorage.removeItem("user-expiresIn");
        setToken(null);
        navigate("/login");
      }
    }
  }, [setToken, navigate]);
};
export default useAutoLogout;

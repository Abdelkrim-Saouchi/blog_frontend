import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoginError, setIsLoginError] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const setToken = useOutletContext();

  const submitUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 401) {
        setIsLoginError(true);
      } else if (res.ok) {
        const data = await res.json();
        localStorage.setItem("jwt-token", data.token);
        setToken(localStorage.getItem("jwt-token"));
        navigate("/", { replace: true });
      } else {
        setIsServerError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex flex-col items-center p-4">
      {location.state && (
        <p className="mb-4 text-xl font-semibold text-green-600">
          {location.state.msg}
        </p>
      )}

      <h2 className="mb-4 text-2xl font-bold">Login:</h2>

      {isLoginError && (
        <p className="mb-4 text-red-600">Email or password incorrect!</p>
      )}

      {isServerError && (
        <p className="mb-4 text-red-600">Something gone Wrong! try later.</p>
      )}

      <form
        action=""
        method="post"
        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 md:px-8"
        onSubmit={submitUser}
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            className="rounded bg-gray-100 p-2"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="rounded bg-gray-100 p-2"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="rounded-2xl bg-black p-3 text-white">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;

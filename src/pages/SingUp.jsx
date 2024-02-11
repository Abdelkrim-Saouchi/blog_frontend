import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hostname } from "../globals/hostname";

const SingUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showMatchError, setShowMatchError] = useState(false);
  const [serverValidationErrors, setServerValidationErrors] = useState([]);
  const navigate = useNavigate();

  const isPasswordMatch = () => {
    return password === confirmation;
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (!isPasswordMatch()) {
      return setShowMatchError(true);
    }

    try {
      const res = await fetch(`${hostname}/api/v1/users/signup`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmation: confirmation,
        }),
      });
      if (res.ok) {
        // if success redirect to home page
        navigate("/login", {
          replace: true,
          state: { msg: "Your Sign up was successful. You can login now." },
        });
      } else {
        // if users inputs are not valid
        const data = await res.json();
        setServerValidationErrors(data.errors);
      }
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <main className="flex flex-col items-center p-4">
      <h2 className="mb-4 text-2xl font-bold">Sign up new user</h2>

      {showMatchError && (
        <p className="mb-4 text-red-600">Password does not match!</p>
      )}

      {serverValidationErrors.length > 0 && (
        <ul className="mb-4 list-inside list-disc text-red-600">
          {serverValidationErrors.map((element, index) => {
            return <li key={index}>{element.msg}</li>;
          })}
        </ul>
      )}

      <form
        action=""
        method="post"
        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 md:px-8"
        onSubmit={sendData}
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="krimothiazine"
            className="rounded bg-gray-100 p-2"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className="mb-4 flex flex-col">
          <label htmlFor="passwordConfirmation">Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            className="rounded bg-gray-100 p-2"
            required
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </div>
        <button type="submit" className="rounded-2xl bg-black p-3 text-white">
          Register
        </button>
      </form>
    </main>
  );
};

export default SingUp;

import { Form, redirect, useActionData, useLocation } from "react-router-dom";
import { login } from "../api/login";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const error = {};

  const res = await login(formData);

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("jwt-token", data.token);
    return redirect("/");
  }
  if (res.status === 401) {
    error.isLoginError = true;
    return error;
  }
  if (res.status === 400) {
    const data = await res.json();
    error.serverErrors = data.errors;
    return error;
  }
};

const Login = () => {
  const location = useLocation();
  const error = useActionData();

  return (
    <main className="flex flex-col items-center p-4">
      {location.state?._isRedirect && (
        <p className="mb-4 text-xl font-semibold text-green-600">
          Your Sign up was successful. You can login now.
        </p>
      )}

      <h2 className="mb-4 text-2xl font-bold">Login:</h2>

      {error?.isLoginError && (
        <p className="mb-4 text-red-600">Email or password incorrect!</p>
      )}

      {error?.serverErrors?.length > 0 && (
        <ul className="mb-4 list-inside list-disc text-red-600">
          {error.serverErrors.map((element, index) => {
            return <li key={index}>{element.msg}</li>;
          })}
        </ul>
      )}

      <Form
        method="post"
        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 md:px-8"
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            className="rounded bg-gray-100 p-2"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="rounded bg-gray-100 p-2"
            required
          />
        </div>

        <button type="submit" className="rounded-2xl bg-black p-3 text-white">
          Login
        </button>
      </Form>
    </main>
  );
};

export default Login;

import {
  Form,
  Link,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { login } from "../api/login";
import ms from "ms";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const error = {};

  const res = await login(formData);

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("jwt-token", data.token);
    localStorage.setItem("userId", data.userId);
    const userExpiresIn = Date.now() + ms(data.expiresIn);
    localStorage.setItem("user-expiresIn", userExpiresIn);
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
  if (res.status === 500) {
    error.isInternalError = true;
    return error;
  }
};

const Login = () => {
  const location = useLocation();
  const error = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  return (
    <main className="flex min-h-dvh flex-col items-center bg-custom-bg p-6 text-custom-text">
      {location.state?._isRedirect && (
        <p className="mb-6 text-xl font-semibold text-green-600">
          Your Sign up was successful. You can login now.
        </p>
      )}

      <h2 className="mb-6 text-2xl font-bold">Login:</h2>

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

      {error?.isInternalError && (
        <p className="mb-4 text-red-600">
          Something wrong happened! check if you are signed up.
        </p>
      )}

      <Form
        method="post"
        className="flex flex-col items-center gap-4 rounded-lg border-2 border-custom-text bg-custom-primary-lighten p-4 drop-shadow-3xl md:px-8"
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            required
            autoComplete="username"
            className="rounded border border-custom-text bg-custom-secondary/40 p-2 placeholder:text-custom-text"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded border border-custom-text bg-custom-secondary/40 p-2"
          />
        </div>

        <div className="flex items-center justify-between self-stretch">
          <p>Don't have account?</p>
          <Link
            to="/singup"
            className="text-custom-accent-darken hover:underline"
          >
            Sign up
          </Link>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="flex items-center justify-center gap-2 self-stretch rounded-2xl border border-custom-text bg-custom-secondary/40 p-2 text-lg font-semibold hover:bg-custom-accent"
        >
          {busy ? (
            <>
              {" "}
              <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
              LOGINING{" "}
            </>
          ) : (
            "LOGIN"
          )}
        </button>
      </Form>
    </main>
  );
};

export default Login;

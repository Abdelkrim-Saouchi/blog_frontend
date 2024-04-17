import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createUser } from "../api/createUser";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const error = {};
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");

  if (password !== confirmation) {
    error.isPasswordMismatch = true;
    return error;
  }

  // otherwise create user
  const res = await createUser(formData);

  if (res.ok) {
    // if success redirect to home page
    return redirect("/login");
  } else {
    // if users inputs are not valid
    const data = await res.json();
    error.serverErrors = data.errors;
    return error;
  }
};

const SingUp = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  return (
    <main className="flex min-h-dvh flex-col items-center bg-custom-bg p-6 text-custom-text">
      <h2 className="mb-6 text-2xl font-bold">Sign up new user</h2>

      {error?.isPasswordMismatch && (
        <p className="mb-6 text-red-600">Password does not match!</p>
      )}

      {error?.serverErrors?.length > 0 && (
        <ul className="mb-6 list-inside list-disc text-red-600">
          {error.serverErrors?.map((element, index) => {
            return <li key={index}>{element.msg}</li>;
          })}
        </ul>
      )}

      <Form
        method="post"
        className="flex flex-col items-center gap-4 rounded-lg border-2 border-custom-text bg-custom-primary-lighten p-4 text-custom-text drop-shadow-3xl md:px-8"
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="font-semibold">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Ex: krimothiazine"
            required
            autoComplete="username"
            className="rounded border border-custom-text bg-custom-secondary/40 p-2 placeholder:text-custom-text"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            className="rounded border border-custom-text bg-custom-secondary/40 p-2 placeholder:text-custom-text"
            required
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
            autoComplete="new-password"
            className="rounded border border-custom-text bg-custom-secondary/40 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordConfirmation" className="font-semibold">
            Confirmation:
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            name="confirmation"
            required
            autoComplete="new-password"
            className="rounded border border-custom-text bg-custom-secondary/40 p-2"
          />
        </div>
        <div className="flex items-center justify-between self-stretch">
          <p>Already have account?</p>
          <Link
            to="/login"
            className="text-custom-accent-darken hover:underline"
          >
            Login
          </Link>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="flex items-center justify-center gap-2 self-stretch rounded-2xl border border-custom-text bg-custom-secondary/40 p-3 font-semibold hover:bg-custom-accent"
        >
          {busy ? (
            <>
              <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
              Processing
            </>
          ) : (
            "Register"
          )}
        </button>
      </Form>
    </main>
  );
};

export default SingUp;

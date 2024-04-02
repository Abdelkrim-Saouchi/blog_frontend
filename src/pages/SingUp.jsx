import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
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
    <main className="flex min-h-dvh flex-col items-center bg-custom-bg p-4 text-custom-text">
      <h2 className="mb-4 text-2xl font-bold">Sign up new user</h2>

      {error?.isPasswordMismatch && (
        <p className="mb-4 text-red-600">Password does not match!</p>
      )}

      {error?.serverErrors?.length > 0 && (
        <ul className="mb-4 list-inside list-disc text-red-600">
          {error.serverErrors?.map((element, index) => {
            return <li key={index}>{element.msg}</li>;
          })}
        </ul>
      )}

      <Form
        method="post"
        className="flex flex-col items-center rounded-lg border border-gray-200 bg-custom-primary-light p-4 md:px-8"
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="krimothiazine"
            required
            autoComplete="username"
            className="rounded bg-custom-secondary-light p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            className="rounded bg-custom-secondary-light p-2"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="new-password"
            className="rounded bg-custom-secondary-light p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="passwordConfirmation">Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="confirmation"
            required
            autoComplete="new-password"
            className="rounded bg-custom-secondary-light p-2"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="flex items-center gap-2 rounded-2xl bg-custom-accent p-3"
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

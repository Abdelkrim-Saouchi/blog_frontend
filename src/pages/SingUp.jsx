const SingUp = () => {
  return (
    <main className="flex flex-col items-center p-4">
      <h2 className="mb-4 text-2xl font-bold">Sign up new user</h2>
      <form
        action=""
        method="post"
        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 md:px-8"
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="krimothiazine"
            className="rounded bg-gray-100 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            className="rounded bg-gray-100 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="rounded bg-gray-100 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="passwordConfirmation">Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            className="rounded bg-gray-100 p-2"
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

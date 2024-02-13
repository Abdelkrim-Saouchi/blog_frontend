import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className="m-8">
      <h2 className="text-3xl font-bold">Fetch error</h2>
      <p className="text-gray-500">{error.message || error.statusText}</p>
    </main>
  );
};

export default ErrorPage;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import ArticlePage, { loader as articleLoader } from "./pages/ArticlePage";
import ErrorPage from "./pages/ErrorPage";
import Home, { loader as homeLoader } from "./pages/Home";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/singup",
        element: <SingUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/articles/:id",
        element: <ArticlePage />,
        loader: articleLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

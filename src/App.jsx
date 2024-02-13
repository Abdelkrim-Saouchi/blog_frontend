import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, {
  action as RootAction,
  loader as RootLoader,
} from "./components/Root";
import ArticlePage, { loader as articleLoader } from "./pages/ArticlePage";
import ErrorPage from "./pages/ErrorPage";
import Home, { loader as homeLoader } from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import SingUp, { action as signUpAction } from "./pages/SingUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: RootLoader,
    action: RootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/singup",
        element: <SingUp />,
        action: signUpAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
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

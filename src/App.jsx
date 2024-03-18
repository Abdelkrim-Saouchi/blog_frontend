import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DeleteComment, {
  action as delCommentAction,
} from "./components/DeleteComment";
import Root, {
  action as RootAction,
  loader as RootLoader,
} from "./components/Root";
import UpdateComment, {
  loader as commentLoader,
  action as upCommentAction,
} from "./components/UpdateComment";
import ArticlePage, {
  action as articleAction,
  loader as articleLoader,
} from "./pages/ArticlePage";
import ErrorPage from "./pages/ErrorPage";
import Home, { loader as homeLoader } from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import SingUp, { action as signUpAction } from "./pages/SingUp";
import SearchPage, { loader as searchLoader } from "./pages/SearchPage";
import FilterPage, { loader as fitlerLoader } from "./pages/FilterPage";

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
        path: "singup",
        element: <SingUp />,
        action: signUpAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "articles/:id",
        element: <ArticlePage />,
        loader: articleLoader,
        action: articleAction,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "comments/:commentId/update",
            element: <UpdateComment />,
            loader: commentLoader,
            action: upCommentAction,
          },
          {
            path: "comments/:commentId/delete",
            element: <DeleteComment />,
            action: delCommentAction,
          },
        ],
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: searchLoader,
      },
      {
        path: "filter",
        element: <FilterPage />,
        loader: fitlerLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

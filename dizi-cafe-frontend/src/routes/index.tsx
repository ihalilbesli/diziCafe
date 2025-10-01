import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Navbar from "../components/Navbar/Navbar";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import Faq from "../pages/Faq/Faq";
import FilmDetail from "../pages/FilmDetail/FilmDetail";
import SavedFilms from "../pages/SavedFilms/SavedFilms";
import LikedFilms from "../pages/LikedFilms/LikedFilms";
import DislikedFilms from "../pages/DislikedFilms/DislikedFilms";
import MyComments from "../pages/MyComments/MyComments";
import Settings from "../pages/Settings/Settings";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/terms",
        element: <Terms />
      },
      {
        path: "/privacy",
        element: <Privacy />
      },
      {
        path: "/faq",
        element: <Faq />
      },
      {
        path: "/films/:id",
        element: <FilmDetail />
      },
      {
        path: "/saved",
        element: <SavedFilms />
      },
      {
        path: "/saved",
        element: <SavedFilms />
      },
      {
        path: "/liked",
        element: <LikedFilms />
      },
      {
        path: "/disliked",
        element: <DislikedFilms />
      },
      {
        path: "/my-comments",
        element: <MyComments />
      },
      {
        path: "/settings",
        element: <Settings />
      }

    ]
  }
]);

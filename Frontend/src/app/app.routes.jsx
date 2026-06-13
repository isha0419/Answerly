import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/auth/pages/Home";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Protected><Dashboard /></Protected>,
  }
]);
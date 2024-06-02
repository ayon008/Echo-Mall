import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../Layout/MainPage";
import DashboardLayout from "../../Layout/DashboardLayout";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import Contact from "../../Pages/Contact/Contact";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Chackout from "../../Components/Chackout/Chackout";
import Buy_Now from "../../Components/Buy_Now/Buy_Now";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Products from "../../Pages/Products/Products";
import AddToCart from "../../Components/AddToCart/AddToCart";
import Buy_All from "../../Components/Buy_Now/Buy_All";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Chackout/:_id",
        element: (<PrivateRoute> <Chackout /></PrivateRoute>),
        loader: ({ params }) => fetch(`${import.meta.env.VITE_DataHost}/data/${params._id}`)
      },

      {
        path: "/shipping/:_id",
        element: <Buy_Now></Buy_Now>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_DataHost}/data/${params._id}`)
      },
      {
        path: "/shipping",
        element: <Buy_All />
      },
      {
        path: '/products/:category',
        element: <Products></Products>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_DataHost}/products/${params.category}`)
      },
      {
        path: '/addToCart',
        element: <PrivateRoute><AddToCart /></PrivateRoute>,
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
  },
]);

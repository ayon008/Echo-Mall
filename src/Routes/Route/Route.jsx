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
import MyAccount from "../../Components/MyAccount/MyAccount";
import Payment from "../../Components/Payment/Payment";
import MyOrders from "../../Components/MyAccount/MyOrders";
import AddReview from "../../Components/AddReview/AddReview";
import ActiveOrders from "../../Components/Admin/ActiveOrders";
import Dashboard from "../../Dashboard/Dashboard";
import AllProducts from "../../Components/Admin/AllProducts";
import UpdateProduct from "../../Components/Admin/UpdateProduct";

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
      },
      {
        path: '/myOrders',
        element: <PrivateRoute><MyOrders /></PrivateRoute>,
      },
      {
        path: '/myAccount',
        element: <PrivateRoute><MyAccount /></PrivateRoute>
      },
      {
        path: '/payments',
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
      {
        path: '/addReview/:id',
        element: <PrivateRoute><AddReview /></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_DataHost}/data/${params.id}`)
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
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      },
      {
        path: "manageProducts",
        element: <PrivateRoute><ActiveOrders></ActiveOrders></PrivateRoute>
      },
      {
        path: "allProducts",
        element: <PrivateRoute><AllProducts /></PrivateRoute>
      },
      {
        path: "allProducts/:id",
        element: <PrivateRoute><UpdateProduct /></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_DataHost}/data/${params.id}`)
      }
    ]
  },
]);

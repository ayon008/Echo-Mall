import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import { router } from "./Routes/Route/Route";
import { Providers } from "./GlobalRedux/provider";
import AuthProvider from "./Contexts/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Providers>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </Providers>
  </QueryClientProvider>
);

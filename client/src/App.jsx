import React from "react"
import "./app.css"

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/home";
import Footer from "./components/footer/Footer";
import Chat from "./pages/chat/chat";
import Chats from "./pages/chats/chats";
import Create from "./pages/create/create";
import Login from "./pages/login/login";
import Need from "./pages/need/need";
import Needs from "./pages/needs/needs";
import Processrequests from "./pages/processrequests/processrequests";
import Register from "./pages/register/register";
import Userneeds from "./pages/userneeds/userneeds";
import Pay from "./pages/Pay/Pay";
import Success from "./pages/success/Success";





import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';


import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";









function App() {

  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/needs",
          element: <Needs />,
        },
        {
          path: "/userneeds",
          element: <Userneeds />,
        },
        {
          path: "/processrequests",
          element: <Processrequests />,
        },
        {
          path: "/chats",
          element: <Chats />,
        },
        {
          path: "/chat/:id",
          element: <Chat />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/need/:id",
          element: <Need />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },{
      path: "/pay/:id",
      element: <Pay />,
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

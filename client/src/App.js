import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AuthPage from "./pages/AuthPage/AuthPage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Profile2 from "./pages/Profile2/Profile2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import GiftList from "./pages/Giftlist/Giftlist";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import BrowsingHistory from "./components/BrowsingHistory/BrowsingHistory";
import Slider from "./components/Slider/Slider"
import { useSelector } from 'react-redux';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'
import React from 'react';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <AuthPage />,
    },
    {
      path: "/register",
      element: <AuthPage children={<RegisterForm />} />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/profile2",
      element: <Profile2 />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/wishlist",
      element: <Wishlist />,
    },
    {
      path: "/giftlist",
      element: <GiftList />,
    },
    {
      path: "/product/:id",
      element: <SingleProductPage />,
    },
    {
      path: "/history",
      element: <BrowsingHistory />,
    },
  ],
  {
    errorElement: <ErrorPage />,
  }
);

function App() {

  const darkMode = useSelector((state) => state.darkMode);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);





  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
}

export default App;

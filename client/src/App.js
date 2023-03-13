import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AuthPage from "./pages/AuthPage/AuthPage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
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
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/product",
    element: <SingleProductPage />,
  },
], 
{
  errorElement: <ErrorPage />,
}
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

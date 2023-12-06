
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Main/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/UserDashboard/Dashboard/Dashboard";
import PrivateRoute from "./PriveteRoute/PrivateRoute";
import VideoPlayer from "../pages/VideoPlay";
import Package from "../pages/Package/Package";
import AdminDashboard from "../pages/AdminDashboard/adminDashboard/AdminDashboard";
import PaymentUser from "../pages/AdminDashboard/PaymentUser/Paymentuser";
import Account from "../pages/Account/Account";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

const Route = createBrowserRouter([
      {
            path: '/',
            element: <Main></Main>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                  {
                        path: '/',
                        element: <Home></Home>
                  },
                  {
                        path: '/login',
                        element: <Login></Login>
                  },
                  {
                        path: '/register',
                        element: <Register></Register>
                  },
                  {
                        path: '/video/:id',
                        element: <VideoPlayer></VideoPlayer>,
                        loader: ({ params }) => fetch(`https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/videos/${params.id}`)
                  },
                  {
                        path: '/dashboard',
                        element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>
                  },
                  {
                        path: '/package',
                        element: <PrivateRoute> <Package></Package></PrivateRoute>
                  },
                  {
                        path: '/dashboard/admin',
                        element: <PrivateRoute> <AdminDashboard></AdminDashboard></PrivateRoute>
                  },
                  {
                        path: '/dashboard/payment',
                        element: <PrivateRoute> <PaymentUser></PaymentUser></PrivateRoute>
                  },
                  {
                        path: '/dashboard/account',
                        element: <PrivateRoute> <Account></Account></PrivateRoute>
                  }

            ]
      }
])
export default Route;
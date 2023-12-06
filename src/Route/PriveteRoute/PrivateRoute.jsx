import { useContext } from "react";
import { AuthContact } from "../../GlobalContact/GlobalConteact";
import { Navigate } from "react-router-dom/dist";



const PrivateRoute = ({ children }) => {
     const { user, loading } = useContext(AuthContact);


     if (loading) {
          return <p className=" h-screen w-full  flex justify-center  items-center "> Loading ...</p>
     }

     if (user) {
          return children
     } else {
          return <Navigate to={'/login'}  ></Navigate>
     }





};

export default PrivateRoute;
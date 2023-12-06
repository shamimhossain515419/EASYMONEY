import { useContext } from "react";
import UserApi from "../../../Api/UserApi";
import Container from "../../../Components/Contaner";
import { AuthContact } from "../../../GlobalContact/GlobalConteact";
import { AllUsers } from "./Table/Table";


const AdminDashboard = () => {

     const { user } = useContext(AuthContact);

     return (
          <div>
               <div>
                    <Container>
                         <div>
                              <h1 className=" py-7 text-base md:text-2xl font-bold my-1"> Welcome  {user?.email} </h1>
                         </div>
                         <div>
                              <AllUsers></AllUsers>
                         </div>

                    </Container>
               </div>
          </div>
     );
};

export default AdminDashboard;
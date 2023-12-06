import { useContext } from "react";
import Container from "../../../Components/Contaner";
import { AuthContact } from "../../../GlobalContact/GlobalConteact";
import Video from "../../../Components/Video/Video";
import LocalHost from "../../../Main/Localhost";
import UserApi from "../../../Api/UserApi";


const Dashboard = () => {
     const { user, userInfo, setUserInfo } = useContext(AuthContact);

     const [userData, refetch, isLoading] = UserApi(user?.email);



     return (
          <div className=" pt-10 bg-[#F5F5F5]">
               <Container>

                    {
                         userData ? <> <div className=" grid md:grid-cols-4  gap-6">
                              <div className=" md:col-span-1 max-h-screen shadow-lg bg-white p-3  rounded">
                                   <div className=" flex items-center gap-3">
                                        <img className="h-[80px] w-[80px] rounded-full   object-cover " src={user?.photoURL} alt="" />
                                        <h1 className=" text-xl font-medium"> {user?.displayName} </h1>
                                   </div>
                                   <h2 className=" text-xl font-semibold my-2 text-center textColor py-0  capitalize "> Level - {userData?.level} </h2>
                                   <hr className=" mt-5" />
                                   <div>
                                        <h2 className=" text-2xl font-semibold my-2 ">  Earn:  {userData?.money ? userData?.money : " 00.00 "} ৳ </h2>
                                        <h2 className=" text-xl font-semibold my-2 ">  Refer Earn:  {userData?.refar ? userData?.refar : " 00.00 "} ৳ </h2>
                                        <h2 className=" text-xl font-semibold my-2 ">  Total Earn:  {userData?.money || userData?.refar ? userData?.money  + userData?.refar  : " 00.00 "} ৳ </h2>
                                   </div>
                              </div>
                              <div className=" md:col-span-3 gap-2 w-full">
                                   <Video userInfo={userData}></Video>
                              </div>
                         </div>   <LocalHost refetch={refetch} userData={userData}></LocalHost>
                         </> : <p className=" h-screen w-full  flex justify-center  items-center "> Loading ...</p>
                    }



               </Container>

          </div>
     );
};

export default Dashboard;
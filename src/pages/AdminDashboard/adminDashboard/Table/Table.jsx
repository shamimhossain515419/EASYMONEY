import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
     Card,
     CardHeader,
     Input,
     Typography,
     Button,
     CardBody,
     Chip,
     CardFooter,
     Tabs,
     TabsHeader,
     Tab,
     Avatar,
     IconButton,
     Tooltip,
} from "@material-tailwind/react";
import { BsFillTrashFill } from 'react-icons/bs'
import { useContext, useEffect } from "react";
import { AuthContact } from "../../../../GlobalContact/GlobalConteact";
import { useState } from "react";
import useAxiosSecure from "../../../../Components/AsioxSecures/useAxiosSecure";
import toast from "react-hot-toast";
import UpdateUser from "./updateUser";

const TABS = [
     {
          label: "All",
          value: "all",
     },
     {
          label: "Monitored",
          value: "monitored",
     },
     {
          label: "Unmonitored",
          value: "unmonitored",
     },
];

const TABLE_HEAD = ["Member", "Function", "Status", "Date", "Actions"];







export function AllUsers() {
     const { user } = useContext(AuthContact)
     const [allUser, setAllUser] = useState([])
     const [showModal, setShowModal] = useState(false)
     const [SingleUser, setSingleUser] = useState({})
     const token = localStorage.getItem('access-token');
     const [axiosSecure] = useAxiosSecure();
     useEffect(() => {
          fetch(`https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/users?email=${user?.email}`, {
               method: "GET",
               headers: {
                    Authorization: `Bearer ${token}`
               }
          }).then(res => res.json().then(data => {
               setAllUser(data)
          }))
     }, [user?.emai]);

     const handleDeleteUser = (id) => {
          axiosSecure.delete(`/users?id=${id}`).then(result => {
               if (result) {
                    toast.success("successfully delete")
               }

          }).then(error => {
               toast.error(error.message)
          })

     }



     return (

          <div>
               <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                         <div className="mb-8 flex items-center justify-between gap-8">
                              <div>
                                   <Typography variant="h5" color="blue-gray">
                                        Members list
                                   </Typography>
                                   <Typography color="gray" className="mt-1 font-normal">
                                        See information about all members
                                   </Typography>
                              </div>
                              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                   <Button variant="outlined" size="sm">
                                        view all
                                   </Button>
                                   <Button className="flex items-center gap-3" size="sm">
                                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                                   </Button>
                              </div>
                         </div>
                         <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                              <Tabs value="all" className="w-full md:w-max">
                                   <TabsHeader>
                                        {TABS.map(({ label, value }) => (
                                             <Tab key={value} value={value}>
                                                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                             </Tab>
                                        ))}
                                   </TabsHeader>
                              </Tabs>
                              <div className="w-full md:w-72">
                                   <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                   />
                              </div>
                         </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0">
                         {
                              allUser?.length > 1 ? <> <table className="mt-4 w-full min-w-max table-auto text-left">
                                   <thead>
                                        <tr>
                                             {TABLE_HEAD.map((head) => (
                                                  <th
                                                       key={head}
                                                       className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                                  >
                                                       <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal leading-none opacity-70"
                                                       >
                                                            {head}
                                                       </Typography>
                                                  </th>
                                             ))}
                                        </tr>
                                   </thead>


                                   <tbody>


                                        {allUser.map(
                                             (item, index) => {
                                                  const isLast = index === allUser.length - 1;
                                                  const classes = isLast
                                                       ? "p-4"
                                                       : "p-4 border-b border-blue-gray-50";

                                                  return (
                                                       <tr key={item?._id}>
                                                            <td className={classes}>
                                                                 <div className="flex items-center gap-3">
                                                                      <Avatar src={item?.photo} alt={'image'} size="sm" />
                                                                      <div className="flex flex-col">
                                                                           <Typography
                                                                                variant="small"
                                                                                color="blue-gray"
                                                                                className="font-normal"
                                                                           >
                                                                                {item?.name}
                                                                           </Typography>
                                                                           <Typography
                                                                                variant="small"
                                                                                color="blue-gray"
                                                                                className="font-normal opacity-70"
                                                                           >
                                                                                {item?.email}
                                                                           </Typography>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                            <td className={classes}>
                                                                 <div className="flex flex-col">
                                                                      <Typography
                                                                           variant="small"
                                                                           color="blue-gray"
                                                                           className="font-normal"
                                                                      >
                                                                           {item?.ret}
                                                                      </Typography>
                                                                      <Typography
                                                                           variant="small"
                                                                           color="blue-gray"
                                                                           className="font-normal opacity-70"
                                                                      >
                                                                           {item?.role}
                                                                      </Typography>
                                                                 </div>
                                                            </td>
                                                            <td className={classes}>
                                                                 <div className="w-max">
                                                                      <Chip
                                                                           variant="ghost"
                                                                           size="sm"
                                                                           value={item?.status ? "pending" : "pending"}
                                                                           color={item?.status ? "success" : "success"}
                                                                      />
                                                                 </div>
                                                            </td>
                                                            <td className={classes}>
                                                                 <Typography
                                                                      variant="small"
                                                                      color="blue-gray"
                                                                      className="font-normal"
                                                                 >
                                                                      {item?.date}
                                                                 </Typography>
                                                            </td>
                                                            <td className={classes}>
                                                                 <Tooltip content="Edit User">
                                                                      <IconButton onClick={() => { setSingleUser(item), setShowModal(true) }} variant="text">
                                                                           <PencilIcon className="h-4 w-4" />
                                                                      </IconButton>
                                                                 </Tooltip>
                                                                 <Tooltip content="Delete User">
                                                                      <IconButton onClick={() => { handleDeleteUser(item?._id) }} variant="text">
                                                                           <BsFillTrashFill className=" text-red-500"> </BsFillTrashFill>
                                                                      </IconButton>
                                                                 </Tooltip>

                                                            </td>
                                                       </tr>
                                                  );
                                             },
                                        )}


                                   </tbody>


                              </table>
                              </> : <p className=" text-xl font-medium flex h-[50vh] w-full items-center justify-center">Loading ....</p>
                         }



                    </CardBody>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                         <Typography variant="small" color="blue-gray" className="font-normal">
                              Page 1 of 10
                         </Typography>
                         <div className="flex gap-2">
                              <Button variant="outlined" size="sm">
                                   Previous
                              </Button>
                              <Button variant="outlined" size="sm">
                                   Next
                              </Button>
                         </div>
                    </CardFooter>
               </Card>



               <UpdateUser SingleUser={SingleUser} setShowModal={setShowModal} showModal={showModal} ></UpdateUser>

          </div>

     );
}
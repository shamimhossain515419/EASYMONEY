import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Components/AsioxSecures/useAxiosSecure";
const UserApi = (email) => {
     const [axiosSecure] =useAxiosSecure();

     const { data, refetch, isLoading } =  useQuery({
          queryKey: ['user'],
          queryFn: () =>  axiosSecure.get(`https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/user?email=${email}`),
       });

       const userData=data?.data;

     return [userData,refetch,isLoading]
};

export default UserApi;
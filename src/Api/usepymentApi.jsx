import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Components/AsioxSecures/useAxiosSecure"



const getAllPayment = () => {
     const [axiosSecure] = useAxiosSecure();
     const { data, refetch, isLoading } = useQuery({
          queryKey: ['payment'],
          queryFn: () => axiosSecure.get(`https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/payment`),
     });

     const paymentData = data?.data;

     return [paymentData, refetch, isLoading]


}

export default getAllPayment;
import { useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContact } from '../../GlobalContact/GlobalConteact';
import { useNavigate } from 'react-router-dom/dist';


const axiosSecure = axios.create({
     baseURL: 'https://easymoney-server.vercel.app',
});

const useAxiosSecure = () => {
     const { LogOut,setLoading } = useContext(AuthContact)
     const navigate = useNavigate();

     useEffect(() => {
          const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
               const token = localStorage.getItem('access-token');
               if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
               }
               return config;
          });

          const responseInterceptor = axiosSecure.interceptors.response.use(
               (response) => response,
               async (error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                         setLoading(false)
                         navigate('/');
                    }
                    return Promise.reject(error);
               }
          );

          return () => {
               axiosSecure.interceptors.request.eject(requestInterceptor);
               axiosSecure.interceptors.response.eject(responseInterceptor);
          };
     }, [LogOut, navigate, axiosSecure]);

     return [axiosSecure];
};

export default useAxiosSecure;
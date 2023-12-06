
import { useState, useRef, useEffect, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContact } from '../GlobalContact/GlobalConteact';
import Container from '../Components/Contaner';
import useAxiosSecure from '../Components/AsioxSecures/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import UserApi from '../Api/UserApi';


function VideoPlayer() {
     const { user, userInfo } = useContext(AuthContact);
     const [userData, refetch, isLoading] = UserApi(user?.email);
     const VideoData = useLoaderData();
     const videoRef = useRef(null);
     const [axiosSecure] = useAxiosSecure();
     const [time, setTime] = useState(false);
     const Navigate = useNavigate();
     setInterval(() => {
          setTime(true)
     }, 15000)

     const [videoDuration, setVideoDuration] = useState(0);
     const [currentTime, setCurrentTime] = useState(0);
     console.log(videoRef);
     const Taka = { taka: (userData?.money + userData?.ret) };
 console.log(Taka);
     useEffect(() => {
          // Event handler for when video metadata is loaded
          const handleLoadedMetadata = () => {
               setVideoDuration(videoRef.current.duration);
          };

          // Event handler for when video time is updated
          const handleTimeUpdate = () => {
               setCurrentTime(videoRef.current.currentTime);
          };

          // Attach event listeners when the component mounts
          videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
          videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

          // Clean up the event listeners when the component unmounts
          return () => {
               //  videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
               //  videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          };
     }, []);
     // console.log(isPlay);


     // Helper function to format time in HH:MM:SS format
     const formatTime = (timeInSeconds) => {
          const hours = Math.floor(timeInSeconds / 3600);
          const minutes = Math.floor((timeInSeconds % 3600) / 60);
          const seconds = Math.floor(timeInSeconds % 60);
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
     };

     if (time && user && formatTime(currentTime) === formatTime(videoDuration)) {
          axiosSecure.put(`users/${user?.email}?id=${VideoData._id}`, Taka).then(result => {
               if (result?.data?.modifiedCount == 1) {
                    toast.success(`${userData?.ret} BD Earn`)
                    refetch()
                    Navigate('/dashboard');
                    
               }
               console.log(result);
          }).catch(error => {
               toast.error(`${error?.message}`)
               console.log(error);
          })
     }


     return (
          <div className='py-10'>
               <Container>
                    {/* Video element */}
                    <div className='h-[80vh] w-full'>
                         <video className='h-full w-full' ref={videoRef} controls>
                              <source src={VideoData?.video} type="video/mp4" />
                         </video>
                    </div>

                    <div className='flex items-center justify-between mt-6 gap-2'>
                         <p className='text-xl font-medium'>Current Time: {formatTime(currentTime)}</p>
                         <p className='text-xl font-medium'>Total Duration: {formatTime(videoDuration)}</p>
                    </div>
               </Container>
               <Toaster></Toaster>
          </div>
     );
}

export default VideoPlayer;

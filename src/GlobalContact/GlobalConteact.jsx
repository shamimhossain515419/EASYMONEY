import { createContext, useEffect, useState } from "react";
import app from "../Firebase/FirebaseConfig";
import {
     getAuth,
     createUserWithEmailAndPassword, signInWithPopup,
     updateProfile, onAuthStateChanged, GoogleAuthProvider,
     sendEmailVerification, signInWithEmailAndPassword, signOut
} from 'firebase/auth'
import axios from "axios";
import useAxiosSecure from "../Components/AsioxSecures/useAxiosSecure";
export const AuthContact = createContext();
const auth = getAuth(app)

const GlobalContact = ({ children }) => {
     const [buttonLoading, setButtonLoading] = useState(false);
     const [userInfo, setUserInfo] = useState([]);
     const [pageLoading, setPageLoading] = useState(false);
     const [loading, setLoading] = useState(true);
     const [user, setUser] = useState(null);
     const GoogleProvider = new GoogleAuthProvider();

     const createUser = (email, password) => {
          return createUserWithEmailAndPassword(auth, email, password)

     }
     const updateUserProfile = (name, photo) => {
          return updateProfile(auth?.currentUser, {
               displayName: name,
               photoURL: photo,
          })

     }
     const verifyUser = () => {
          return sendEmailVerification(auth.currentUser)

     }

     const Login = (email, password) => {
          return signInWithEmailAndPassword(auth, email, password)
     }

     const LogOut = () => {
          return signOut(auth)
     }

     const GoogleLogin = () => {
          return signInWithPopup(auth, GoogleProvider)
     }
     useEffect(() => {

          const unsubcript = onAuthStateChanged(auth, currentUser => {
               setLoading(false)
               setUser(currentUser);
               if (currentUser?.email) {

                    axios.post('https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/jwt')
                         .then(data => {
                              localStorage.setItem('access-token', data?.data?.token);
                              setLoading(false)
                              setUser(currentUser);
                         }).catch(error => {
                              localStorage.removeItem('access-token')
                         })

               } else {
                    localStorage.removeItem('access-token')
               }

          })
          return () => {
               unsubcript()
          }
     }, [setLoading]);

     useEffect(() => {
          if (user) {
               axios.get(`https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/user?email=${user?.email}`, {
                    method: "GET",
                    headers: {
                         authorization: ` bearer ${localStorage.getItem('access-token')}`
                    }
               }).then(result => {
                    setUserInfo(result?.data);
               }).catch(error => {
                    console.log(error);
               })
          }

     }, [user]);


     const UserData = {
          userInfo, setUserInfo,
          buttonLoading, setButtonLoading,
          pageLoading, setPageLoading,
          loading, setLoading, updateUserProfile, createUser, user
          , LogOut, Login, verifyUser, GoogleLogin
     }


     return (
          <div>
               <AuthContact.Provider value={UserData}>
                    {children}
               </AuthContact.Provider>
          </div>
     );
};

export default GlobalContact;
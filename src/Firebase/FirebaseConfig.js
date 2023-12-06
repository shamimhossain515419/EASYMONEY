// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyDvokRDJW7NoXdCYB_Mt28Ge7OpPzGQxQ0",
     authDomain: "easymoney-13e05.firebaseapp.com",
     projectId: "easymoney-13e05",
     storageBucket: "easymoney-13e05.appspot.com",
     messagingSenderId: "954313383452",
     appId: "1:954313383452:web:e416633eb0f6d6b21e49d9",
     measurementId: "G-L8N5NW6CYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
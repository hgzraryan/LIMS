// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging,getToken,onMessage} from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU9x_Fg-Vi3xfOUPtIK0nxp4Hd9oPiO2c",
  authDomain: "lims-push-notification.firebaseapp.com",
  projectId: "lims-push-notification",
  storageBucket: "lims-push-notification.appspot.com",
  messagingSenderId: "25541887638",
  appId: "1:25541887638:web:1e35f636ffcc7e7ecca4b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)
export const generateToken = async () =>{
    const permission = await Notification.requestPermission()
    console.log(permission)
    if(permission==='granted'){

        const token = await getToken(messaging,{
            vapidKey:"BCT4fA82IzUKq2r_d405W2EJZkFOrzFnVd-JcFM4giMgUXfFdw_S3tRPjaRAByUV_xaKffHn0l4DoJTB7aM9CTw"
        })
        console.log(token)
    }
}
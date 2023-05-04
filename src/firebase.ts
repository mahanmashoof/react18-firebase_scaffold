import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PID,
  storageBucket: import.meta.env.VITE_SB,
  messagingSenderId: import.meta.env.VITE_SID,
  appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app);

export default firebase;

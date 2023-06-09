import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDESoICT0mCzh6ag-qJC_c9R-ib3j99Jzs",
  authDomain: "hclshop-637cd.firebaseapp.com",
  projectId: "hclshop-637cd",
  storageBucket: "hclshop-637cd.appspot.com",
  messagingSenderId: "1007925900165",
  appId: "1:1007925900165:web:47dcb0f66dd6b0624e0aec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
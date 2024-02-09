import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCvv9VN1NAY1BnQAAg9X2mXHScnUhFqZNY",
  authDomain: "fir-a414c.firebaseapp.com",
  projectId: "fir-a414c",
  storageBucket: "fir-a414c.appspot.com",
  messagingSenderId: "135631091362",
  appId: "1:135631091362:web:686b54b159542e3b0ec9fb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export default app
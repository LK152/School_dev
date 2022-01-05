import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { app } from '../config/firebase.config';

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
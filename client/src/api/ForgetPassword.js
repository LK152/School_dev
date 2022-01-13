import { auth } from "../service/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

export const UpdatePassword = async (email) => {
    await sendPasswordResetEmail(auth, email).then(() => {
        console.log('sent');
    })
}
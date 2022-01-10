import { auth } from "../service/firestore";
import { updatePassword } from "firebase/auth";

export const UpdatePassword = async (newPassword) => {
    await updatePassword(auth.currentUser, newPassword);
}
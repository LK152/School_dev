import { db } from '../config/firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

const DeleteUser = async (id) => {
    await deleteDoc(doc(db, 'userData', id))
}

export default DeleteUser;
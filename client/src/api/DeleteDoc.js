import { db } from '../service/firestore';
import { doc, deleteDoc } from "firebase/firestore";

const DeleteDoc = async (id) => {
    await deleteDoc(doc(db, 'studentData', id));
}

export default DeleteDoc;
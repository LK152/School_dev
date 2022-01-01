import { db } from '../config/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

const EditDoc = async (id, data) => {
    await updateDoc(doc(db, 'studentData', id), data);
}

export default EditDoc;
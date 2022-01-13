import { db } from '../service/firestore';
import { doc, updateDoc } from 'firebase/firestore';

const EditDoc = async (id, data) => {
    await updateDoc(doc(db, 'studentData', id), data);
}

export default EditDoc;
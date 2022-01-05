import { db } from '../service/firestore';
import { setDoc, doc } from 'firebase/firestore';

const CreateDoc = async (data) => {
    await setDoc(doc(db, "studentData", data.studentId), data);
};

export default CreateDoc;
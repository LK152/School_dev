import { db } from '../config/firebase.config';
import { setDoc, doc } from 'firebase/firestore';

const CreateData = async (data) => {
    await setDoc(doc(db, "studentData", data.studentId), data);
};

export default CreateData;
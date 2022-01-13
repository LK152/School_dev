import { db } from '../service/firestore';
import { setDoc, doc } from 'firebase/firestore';

const CreateDoc = async (data) => {
    await setDoc(doc(db, "studentData", data.uid), data);
};

export default CreateDoc;
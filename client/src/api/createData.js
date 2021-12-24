import { db } from '../config/firebase.config';
import { collection, addDoc } from 'firebase/firestore';

const Collection = collection(db, 'studentData');

const createData = async (data) => {
    await addDoc(Collection, data);
};

export default createData;
import { db } from '../service/firestore';
import { setDoc, doc } from 'firebase/firestore';

const CreateUser = async (data) => {
    await setDoc(doc(db, "userData", data.uid), data);
};

export default CreateUser;
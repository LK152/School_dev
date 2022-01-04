import { db } from '../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

const CreateUser = async (data) => {
    await setDoc(doc(db, 'userData', data.id), data)
}

export default CreateUser;
import { auth, db } from '../service/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const CreateUser = async (user) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
    await setDoc(doc(db, 'userData', user.email), user);
};

export default CreateUser;
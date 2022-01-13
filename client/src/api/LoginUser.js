import { auth } from '../service/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

const CreateUser = async (user) => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
};

export default CreateUser;
import { auth } from '../service/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateUser = async (user) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
};

export default CreateUser;
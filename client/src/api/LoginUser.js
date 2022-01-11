import { auth } from '../service/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginUser = async (user) => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
};

export default LoginUser;
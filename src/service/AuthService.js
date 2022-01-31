import {
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
	signOut,
	getAuth,
} from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { app } from '../config/firebase.config';

export const auth = getAuth(app);
export const db = getFirestore(app);

if (process.browser) {
	enableIndexedDbPersistence(db).catch((err) => {
		console.log(err);
	});
}

export const AuthService = {
	loginWithGoogleBrowser: async () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			hd: 'lssh.tp.edu.tw',
			prompt: 'select_account',
		});

		try {
			const userCredential = await signInWithPopup(auth, provider);

			return {
				user: userCredential.user,
			};
		} catch (err) {
			return {
				error: err.message,
			};
		}
	},
	loginWithGoogleMobile: async () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			hd: 'lssh.tp.edu.tw',
			prompt: 'select_account',
		});

		try {
			const userCredential = await signInWithRedirect(auth, provider);

			return {
				user: userCredential.user,
			};
		} catch (err) {
			return {
				error: err.message,
			};
		}
	},
	logout: async () => {
		await signOut(auth);
	},
};

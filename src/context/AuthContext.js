import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, db } from '../service/AuthService';
import { useRouter } from 'next/router';
import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';

const authContext = createContext();

const useAuth = () => {
	return useContext(authContext);
};

export const AuthProvider = (props) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [isLoggedOut, setLogout] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		enableMultiTabIndexedDbPersistence(db).catch((err) => {
			if (err.code == 'failed-precondition') {
				console.log(
					'Multiple tabs open, persistence can only be enabled in one tab at a a time.'
				);
			} else if (err.code == 'unimplemented') {
				console.log(
					'The current browser does not support all of thefeatures required to enable persistence'
				);
			}
		});
	}, []);

	const loginWithGoogleBrowser = async () => {
		const { error, user } = await AuthService.loginWithGoogleBrowser();
		setUser(user ?? null);
		setError(error ?? '');
	};

	const loginWithGoogleMobile = async () => {
		const { error, user } = await AuthService.loginWithGoogleMobile();
		setUser(user ?? null);
		setError(error ?? '');
	};

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
		setLogout(true);
		router.replace('/');
	};

	const value = {
		user,
		error,
		isLoggedOut,
		setUser,
		loginWithGoogleBrowser,
		loginWithGoogleMobile,
		logout,
		setLogout,
	};

	return <authContext.Provider value={value} {...props} />;
};

export default useAuth;

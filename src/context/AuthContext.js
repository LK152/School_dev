import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '@src/service/AuthService';
import { useRouter } from 'next/router';
import useLocalState from '@src/hook/useLocalState';
import { getDatabase, ref, onValue } from 'firebase/database';

const authContext = createContext();

const useAuth = () => {
	return useContext(authContext);
};

export const AuthProvider = (props) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [isLoggedOut, setLogout] = useState(false);
	const [error, setError] = useState();
	const [deadline, setDeadline] = useLocalState('deadline', null);
	const rtdb = getDatabase();
	const deadlineRef = ref(rtdb, 'data/deadline');

	useEffect(() => {
		onValue(deadlineRef, (snapshot) => {
			setDeadline(snapshot.val());
		});
	}, [setDeadline, deadlineRef]);

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
		deadline,
		setUser,
		loginWithGoogleBrowser,
		loginWithGoogleMobile,
		logout,
		setLogout,
		setDeadline,
	};

	return <authContext.Provider value={value} {...props} />;
};

export default useAuth;

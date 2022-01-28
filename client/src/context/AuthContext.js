import { createContext, useContext, useState } from 'react';
import { AuthService } from '../service/AuthService';
import { useRouter } from 'next/router';

const authContext = createContext();

const useAuth = () => {
	return useContext(authContext);
};

export const AuthProvider = (props) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [error, setError] = useState();
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
		router.replace('/');
	};

	const value = {
		user,
		error,
		setUser,
		loginWithGoogleBrowser,
		loginWithGoogleMobile,
		logout,
	};

	return <authContext.Provider value={value} {...props} />;
};

export default useAuth;

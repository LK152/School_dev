import { useEffect, useState } from 'react';
import { auth } from '../service/AuthService';
import useAuth from '../context/AuthContext';
import Loader from '@components/Loader';

const AuthStateChanged = ({ children }) => {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
            setLoading(false);
		});
	// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loader />;
	}

    return children;
};

export default AuthStateChanged;
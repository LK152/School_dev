import { useEffect, useState } from 'react';
import { auth } from '../service/AuthService';
import useAuth from '../context/AuthContext';

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
		return <h1>Loading...</h1>;
	}

    return children;
};

export default AuthStateChanged;
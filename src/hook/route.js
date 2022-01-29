import { useRouter } from 'next/router';
import useAuth from '../context/AuthContext';
import useStateContext from '../context/StateContext';

export const withProtected = (Component) => {
	const WithProtected = (props) => {
		const auth = useAuth();
		const router = useRouter();

		if (!auth.user) {
			router.replace('/');
			return <h1>Loading...</h1>;
		}

		return <Component {...props} />;
	};

	return WithProtected;
};

export const withAdmin = (Component) => {
	const WithAdmin = (props) => {
		const auth = useAuth();
		const { authState } = useStateContext();
		const router = useRouter();

		if (!authState.isAdmin || !auth.user) {
			router.replace('/');
			return <h1>Loading...</h1>;
		}

		return <Component {...props} />;
	};

	return WithAdmin;
};

export const withUser = (Component) => {
	const WithUser = (props) => {
		const auth = useAuth();
		const { authState } = useStateContext();
		const router = useRouter();

		if ((!authState.isAdmin && !authState.isTeacher) || !auth.user) {
			router.replace('/');
			return <h1>Loading...</h1>;
		}

		return <Component {...props} />;
	};

	return WithUser;
};

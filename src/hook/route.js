import { useRouter } from 'next/router';
import useAuth from '../context/AuthContext';
import useStateContext from '../context/StateContext';
import Loader from '@components/Loader';
import moment from 'moment';
import { useEffect } from 'react';

export const withProtected = (Component) => {
	const WithProtected = (props) => {
		const auth = useAuth();
		const router = useRouter();

		if (!auth.user) {
			router.replace('/');
			return <Loader />;
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
			return <Loader />;
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
			return <Loader />;
		}

		return <Component {...props} />;
	};

	return WithUser;
};

export const withOverDue = (Component) => {
	const WithOverDue = (props) => {
		const { deadline } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (
				Boolean(
					moment(new Date()).format('YYYYMMDDHHmm') >
						moment(deadline).format('YYYYMMDDHHmm')
				)
			) {
				router.replace('/redirects/OverDue');
				return <Loader />;
			}
		}, [deadline, router]);

		return <Component {...props} />;
	};

	return WithOverDue;
};

const { createContext, useContext, useState, useEffect } = require('react');
import { db } from '@src/service/AuthService';
import axios from 'axios';
import { onSnapshot, doc } from 'firebase/firestore';
import useAuth from './AuthContext';

const optionContext = createContext();

const useOption = () => {
	return useContext(optionContext);
};

export const OptionProvider = (props) => {
	const { user } = useAuth();
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(
				doc(db, 'options', 'classes'),
				(snapshot) => {
					if (snapshot.exists()) {
						setClasses(snapshot.data().classes);
					}
				}
			);

			return () => unsub();
		}
	}, [user]);

	const value = { classes, setClasses };

	return <optionContext.Provider value={value} {...props} />;
};

export default useOption;

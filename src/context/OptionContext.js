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
	const [numbers, setNumbers] = useState([]);

	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(
				doc(db, 'options', 'option'),
				(snapshot) => {
					if (snapshot.exists()) {
						setClasses(snapshot.data().classes)
						setNumbers(snapshot.data().numbers)
					}
				}
			);

			return () => unsub();
		}
	}, [user]);

	const value = { classes, numbers, setClasses, setNumbers };

	return <optionContext.Provider value={value} {...props} />;
};

export default useOption;

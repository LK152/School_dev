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
	const [classes, setClasses] = useState(null);
	const [numbers, setNumbers] = useState(null);
	const [topics, setTopics] = useState(null);
	const [subTopics, setSubTopics] = useState(null);
	const [groups, setGroups] = useState(null);

	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(
				doc(db, 'options', 'option'),
				(snapshot) => {
					setClasses(
						snapshot.exists() ? snapshot.data().classes : null
					);
					setNumbers(
						snapshot.exists() ? snapshot.data().numbers : null
					);
					setTopics(
						snapshot.exists() ? snapshot.data().topics : null
					);
					setSubTopics(
						snapshot.exists() ? snapshot.data().subTopics : null
					);
					setGroups(
						snapshot.exists() ? snapshot.data().groups : null
					);
				}
			);

			return () => unsub();
		}
	}, [user]);

	const value = {
		classes,
		numbers,
		topics,
		subTopics,
		groups,
		setClasses,
		setNumbers,
		setTopics,
		setSubTopics,
		setGroups,
	};

	return <optionContext.Provider value={value} {...props} />;
};

export default useOption;

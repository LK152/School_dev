/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from 'react';
import useSessionState from '../hook/useSessionState';
import { doc, onSnapshot, query, collection, where } from 'firebase/firestore';
import useAuth from './AuthContext';
import { db } from '../service/AuthService';

const stateContext = createContext();

const useStateContext = () => {
	return useContext(stateContext);
};

export const initialValues = {
	studentClass: '',
	number: '',
	studentName: '',
	topic: '',
	topicLabel: '',
	subTopic: '',
	subTopicLabel: '',
	otherTopic: '',
	comment: '',
	memNum: 1,
	mem1Class: '',
	mem1Num: '',
	mem2Class: '',
	mem2Num: '', 
	group: ''
};

const initAuth = {
	isAdmin: false,
	isTeacher: false,
	teacherClass: '',
};

const studentDB = collection(db, 'studentData');
const usersDB = collection(db, 'users');

export const StateProvider = (props) => {
	const { user } = useAuth();
	const [formValues, setFormValues] = useState(initialValues);
	const [authState, setAuthState] = useSessionState('secret', initAuth);
	const [users, setUsers] = useState([]);
	const [document, setDoc] = useState({});
	const [empty, setEmpty] = useState(true);
	const [selectedValues, setSelectedValues] = useState({
		selection: 0,
		selectedGroup: 201,
		group: '',
	});
	const [studentRecord, setRecord] = useState([]);
	const [selected, setSelected] = useState([]);
	const { isAdmin, isTeacher, teacherClass } = authState;
	const subscriptions = [];

	useEffect(() => {
		if (!user && subscriptions.length > 0) {
			subscriptions.forEach((subscription) => {
				subscription();
			});
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			const unSub = onSnapshot(doc(db, 'users', user?.uid), (user) => {
				if (user.exists()) {
					setAuthState(user.data());
				} else {
					setAuthState(initAuth);
				}
			});
			subscriptions.push(unSub);

			return () => unSub();
		} else {
			setAuthState(initAuth);
			sessionStorage.clear();
		}
	}, [user]);

	useEffect(() => {
		if (user && isAdmin) {
			const unSub = onSnapshot(usersDB, (users) => {
				const Users = [];

				if (!users.empty) {
					users.forEach((user) => {
						Users.push(user.data());
					});
				}

				setUsers(Users);
			});
			subscriptions.push(unSub);

			return () => unSub();
		}

		if (!user) {
			setUsers([]);
		}
	}, [user, authState]);

	useEffect(() => {
		if (user && !isAdmin && !isTeacher) {
			const unSub = onSnapshot(
				doc(db, 'studentData', user?.uid),
				(doc) => {
					if (doc.exists()) {
						setDoc(doc.data());
						setEmpty(false);
					} else {
						setDoc({});
					}
				}
			);
			subscriptions.push(unSub);

			return () => unSub();
		}
	}, [user, authState]);

	useEffect(() => {
		if (user && (isAdmin || isTeacher)) {
			const unSub = onSnapshot(
				isAdmin
					? selectedValues.selection !== 0
						? query(
								studentDB,
								where('class', '==', selectedValues.selection)
						  )
						: studentDB
					: query(studentDB, where('class', '==', teacherClass)),
				(records) => {
					const Records = [];

					if (!records.empty) {
						records.forEach((record) => {
							Records.push(record.data());
						});
					}

					setRecord(Records);
				}
			);
			subscriptions.push(unSub);

			return () => unSub();
		}
	}, [user, authState, selectedValues]);

	const value = {
		formValues,
		authState,
		users,
		document,
		empty,
		selectedValues,
		studentRecord,
		selected,
		setFormValues,
		setAuthState,
		setUsers,
		setDoc,
		setEmpty,
		setSelectedValues,
		setRecord,
		setSelected,
	};

	return <stateContext.Provider value={value} {...props} />;
};

export default useStateContext;

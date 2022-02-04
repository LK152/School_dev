/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from 'react';
import useSessionState from '../hook/useSessionState';
import { doc, onSnapshot, collection } from 'firebase/firestore';
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
	group: '',
};

const initAuth = {
	isAdmin: false,
	isTeacher: false,
	teacherClass: '',
};

const studentDB = collection(db, 'studentData');
const usersDB = collection(db, 'users');

export const StateProvider = (props) => {
	const { user, isLoggedOut, setLoggedOut } = useAuth();
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
	const [selectedIds, setSelectedIds] = useState([]);
	const { isAdmin, isTeacher } = authState;
	const subscriptions = [];

	useEffect(() => {
		if (!user && subscriptions.length > 0 && isLoggedOut) {
			subscriptions.forEach((subscription) => {
				subscription();
			});
			setLoggedOut(false);
			setUsers([]);
			setAuthState(initAuth);
			Storage.clear();
		}
	}, [user, isLoggedOut]);

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
			const unSub = onSnapshot(studentDB, (records) => {
				const Records = [];

				if (!records.empty) {
					records.forEach((record) => {
						Records.push(record.data());
					});
				}

				setRecord(Records);
			});
			subscriptions.push(unSub);

			return () => unSub();
		}
	}, [user, authState]);

	const value = {
		formValues,
		authState,
		users,
		document,
		empty,
		selectedValues,
		studentRecord,
		selected,
		selectedIds,
		setFormValues,
		setAuthState,
		setUsers,
		setDoc,
		setEmpty,
		setSelectedValues,
		setRecord,
		setSelected,
		setSelectedIds,
	};

	return <stateContext.Provider value={value} {...props} />;
};

export default useStateContext;

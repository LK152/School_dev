import { auth, db } from '../service/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useSessionState from '../hooks/useSessionState';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';

const ModalContext = createContext();

export const initialValues = {
	class: '',
	number: '',
	name: '',
	mainTopic: '',
	subTopic: '',
	otherTopic: '',
	comment: '',
	memNum: '1',
	mem1Class: '',
	mem1Num: '',
	mem2Class: '',
	mem2Num: '',
};

const ModalProvider = ({ children }) => {
	const [authState, setAuth] = useState({
		isAdmin: false,
		isUser: false,
		class: '',
	});
	const [selectedValues, setSelectedValues] = useState({
		selection: 0,
		selectedGroup: 201,
		group: '',
	});
	const [selected, setSelected] = useState([]);
	const [listOfUsers, setLOU] = useState([]);
	const [values, setValues] = useState(initialValues);
	const [update, setUpdate] = useState(false);
	const [users, setUsers] = useSessionState('users', null);
	const [document, setDoc] = useSessionState('doc', null);
	const [info, setInfo] = useSessionState('userInfo', null);
	const [studentRecord, setRecord] = useSessionState('record', null);

	const axios = rateLimit(Axios.create(), {
		maxRequests: 2,
		perMilliseconds: 1000,
		maxRPS: 2,
	});

	useEffect(
		() => {
			const unSub = onAuthStateChanged(auth, (user) => {
				setInfo(user ? user : null);
				if (!user) {
					setAuth({
						isAdmin: false,
						isUser: false,
						class: '',
					});
					sessionStorage.clear();
				}
			});

			return () => unSub();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get(process.env.REACT_APP_API_URL + '/getAllUsers')
				.then((users) => {
					const userArr = [];

					users.data.forEach((user) => userArr.push(user.email));
					setLOU(userArr);
				})
				.catch((err) => console.log(err));
		};

		if (info) {
			const onSub = onSnapshot(doc(db, 'users', info.uid), (snapshot) => {
				if (snapshot.exists()) {
					setAuth({
						isAdmin: snapshot.data().isAdmin,
						isUser: !snapshot.data().isAdmin,
						class: snapshot.data().userClass,
					});
					fetchData();
				} else {
					setAuth({
						isAdmin: false,
						isUser: false,
						class: '',
					});
				}
			});

			return () => {
				onSub();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [info]);

	useEffect(() => {
		const unSub = onSnapshot(
			authState.isAdmin
				? selectedValues.selection !== 0
					? query(
							collection(db, 'studentData'),
							where('class', '==', selectedValues.selection)
					  )
					: collection(db, 'studentData')
				: query(
						collection(db, 'studentData'),
						where('class', '==', authState.class)
				  ),
			(snapshot) => {
				const docs = [];

				if (!snapshot.empty) {
					snapshot.forEach((doc) => {
						docs.push(doc.data());
					});
				}

				setRecord(docs);
			}
		);

		return () => {
			unSub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authState]);

	useEffect(() => {
		const unSub = onSnapshot(collection(db, 'users'), (snap) => {
			const users = [];

			if (!snap.empty) {
				snap.forEach((user) => {
					users.push(user.data());
				});
			}

			setUsers(users);
		});

		return () => {
			unSub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update]);

	const value = {
		documentObj: [document, setDoc],
		valuesObj: [values, setValues],
		updateObj: [update, setUpdate],
		infoObj: [info, setInfo],
		authObj: [authState, setAuth],
		recordObj: [studentRecord, setRecord],
		selectObj: [selected, setSelected],
		selectedObj: [selectedValues, setSelectedValues],
		usersObj: [users, setUsers],
		userListObj: [listOfUsers, setLOU],
	};

	return (
		<ModalContext.Provider value={value}>
			{children}
			{console.log(update)}
			{console.log(listOfUsers)}
			{console.log(authState)}
		</ModalContext.Provider>
	);
};

export const useModalContext = () => useContext(ModalContext);
export default ModalProvider;

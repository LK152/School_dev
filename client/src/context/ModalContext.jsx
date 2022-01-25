import { auth, db } from '../service/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useSessionState from '../hooks/useSessionState';
import { doc, onSnapshot } from 'firebase/firestore';

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
	const [values, setValues] = useState(initialValues);
	const [document, setDoc] = useSessionState('doc', []);
	const [info, setInfo] = useSessionState('userInfo', null);
	const [studentRecord, setRecord] = useSessionState('record', []);

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				setInfo(user ? user : null);
				if (!user) {
					setAuth({
						isAdmin: false,
						isUser: false,
						class: '',
					});
					sessionStorage.clear();
				}
			}),
		[setInfo, setAuth]
	);

	useEffect(() => {
		if (info) {
			const onSub = onSnapshot(doc(db, 'users', info.uid), (snapshot) => {
				if (snapshot.exists()) {
					setAuth({
						isAdmin: snapshot.data().isAdmin,
						isUser: !snapshot.data().isAdmin,
						class: snapshot.data().userClass,
					});
				} else {
					setAuth({
						isAdmin: false,
						isUser: false,
						class: '',
					});
				}
			});

			return () => onSub();
		}
	}, [info, setAuth]);

	const value = {
		documentObj: [document, setDoc],
		valuesObj: [values, setValues],
		infoObj: [info, setInfo],
		authObj: [authState, setAuth],
		recordObj: [studentRecord, setRecord],
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

export const useModalContext = () => useContext(ModalContext);
export default ModalProvider;

import { auth, db } from '../service/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useSessionState from '../hooks/useSessionState';
import { doc, onSnapshot } from 'firebase/firestore';

const ModalContext = createContext();

export const initialValues = {
	class: '',
	number: '',
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
	});
	const [values, setValues] = useState(initialValues);
	const [update, setUpdate] = useState(false);
	const [document, setDoc] = useSessionState('doc', []);
	const [info, setInfo] = useSessionState('userInfo', null);

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				setInfo(user ? user : null);
				if (!user) {
					setAuth({
						isAdmin: false,
						isUser: false,
					});
				}
			}),
		[setInfo, setAuth]
	);

	useEffect(() => {
		if (info) {
			const onSub = onSnapshot(
				doc(db, 'userData', info.uid),
				(snapshot) => {
					if (snapshot.exists()) {
						setAuth({
							isAdmin: snapshot.data().isAdmin,
							isUser: !snapshot.data().isAdmin,
						});
					} else {
						setAuth({
							isAdmin: false,
							isUser: false,
						});
					}
				}
			);

			return () => onSub();
		}
	}, [info, setAuth]);

	const value = {
		documentObj: [document, setDoc],
		valuesObj: [values, setValues],
		updateObj: [update, setUpdate],
		infoObj: [info, setInfo],
		authObj: [authState, setAuth],
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

export const useModalContext = () => useContext(ModalContext);
export default ModalProvider;

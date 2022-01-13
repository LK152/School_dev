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
	const [document, setDoc] = useState([]);
	const [values, setValues] = useState(initialValues);
	const [update, setUpdate] = useState(false);
	const [info, setInfo] = useSessionState(null);
	const [isUser, setIsUser] = useSessionState('isUser', false);
	const [isAdmin, setIsAdmin] = useSessionState('isAdmin', false);

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			setInfo(user ? user : null);
			if (!user) {
				setIsAdmin(false);
			}
		});

		return () => {
			unSub();
		};
	}, [setInfo, setIsAdmin]);

	useEffect(() => {
		if (info) {
			const onSub = onSnapshot(
				doc(db, 'userData', info.uid),
				(snapshot) => {
					if (snapshot.exists()) {
						setIsAdmin(snapshot.data().isAdmin);
						setIsUser(!snapshot.data().isAdmin ? true : false);
					} else {
						setIsAdmin(false);
						setIsUser(false);
					}
				}
			);

			return () => onSub();
		}
	}, [info, setIsAdmin, setIsUser]);

	const value = {
		documentObj: [document, setDoc],
		valuesObj: [values, setValues],
		updateObj: [update, setUpdate],
		infoObj: [info, setInfo],
		boolObj: [isUser, setIsUser],
		adminObj: [isAdmin, setIsAdmin],
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

export const useModalContext = () => useContext(ModalContext);
export default ModalProvider;

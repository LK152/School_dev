import { auth } from '../service/firestore';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export const ModalContext = createContext();

export const initialValues = {
	class: '',
	number: '',
	mainTopic: '',
	subTopic: '',
	otherTopic: '',
	memNum: '1',
	mem1Class: '',
	mem1Num: '',
	mem2Class: '',
	mem2Num: '',
};

const ModalProvider = ({ children }) => {
	const [info, setInfo] = useState(null);
	const [document, setDoc] = useState([]);
	const [values, setValues] = useState(initialValues);

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			setInfo(user ? user : null);
		});

		return () => {
			unSub();
		};
	}, []);

	return (
		<ModalContext.Provider
			value={{
				infoObj: [info, setInfo],
				documentObj: [document, setDoc],
				valuesObj: [values, setValues],
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;

import { auth } from '../service/firestore';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useSessionState from '../hooks/useSessionState';

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
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [isUser, setIsUser] = useSessionState('isUser', false);

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            setInfo(user ? user : null);
            if (!user.emailVerified) {
                setIsUser(true);
            }
        });

        return () => {
            unSub();
        };
    }, [setIsUser]);

    return (
        <ModalContext.Provider
            value={{
                infoObj: [info, setInfo],
                documentObj: [document, setDoc],
                valuesObj: [values, setValues],
                userObj: [user, setUser],
                boolObj: [isUser, setIsUser],
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;

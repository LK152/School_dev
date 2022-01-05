import { useState, createContext } from 'react';

export const ModalContext = createContext();

const State = {
    isLoggedIn: false,
    userInfo: {
        name: '',
        emailId: '',
        imgUrl: '',
    },
    anchorEl: null,
    canClick: false,
};

export const userState = {
	isAdmin: false, 
	email: '', 
    group: '',
};

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
    const [info, setInfo] = useState(State);
    const [document, setDoc] = useState([]);
    const [values, setValues] = useState(initialValues);
    const [userInfo, setUser] = useState(userState);

    return (
        <ModalContext.Provider
            value={{
                infoObj: [info, setInfo],
                documentObj: [document, setDoc],
                valuesObj: [values, setValues],
                userInfoObj: [userInfo, setUser],
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;

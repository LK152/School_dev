import { useCallback, useEffect, useState } from 'react';
import { loadGoogleScript } from '../lib/GoogleLogin';
import '../css/App.css';
import AccountMenu from './AccountMenu';

const Login = ({ Auth }) => {
    const [gapi, setGapi] = useState();
    const [googleAuth, setGoogleAuth] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState();

    const onLogIn = useCallback((googleUser) => {
        setIsLoggedIn(true);
        const profile = googleUser.getBasicProfile();
        Auth(true);
        setName(profile.getName());
        setEmail(profile.getEmail());
        setImageUrl(profile.getImageUrl());
    }, [Auth]);

    const onFail = useCallback(() => {
        setIsLoggedIn(false);
        Auth(false);
    }, [Auth]);

    const renderSigninButton = useCallback((_gapi) => {
        _gapi.signin2.render('signin_btn', {
            'scope': 'profile email',
            'width': 180,
            'height': 50,
            'longtitle': false,
            'theme': 'dark',
            'onsuccess': onLogIn,
            'onfailure': onFail
        });
    }, [onLogIn, onFail]);

    const logOut = useCallback(() => {
        (async () => {
            await googleAuth.signOut();
            setIsLoggedIn(false);
            Auth(false);
            renderSigninButton(gapi);
        })();
    }, [gapi, googleAuth, Auth, renderSigninButton]);

    useEffect(() => {
        window.onGoogleScriptLoad = () => {
            const _gapi = window.gapi;
            setGapi(_gapi);
            _gapi.load('auth2', () => {
                (async () => {
                    const _googleAuth = await _gapi.auth2.init({
                        client_id: process.env.REACT_APP_GOOGLE_ID, 
                        prompt: 'select_account'
                    });

                    setGoogleAuth(_googleAuth);
                    renderSigninButton(_gapi);
                })();
            });
        }

        loadGoogleScript();

    }, [renderSigninButton]);

    switch(isLoggedIn) {
        case true:
            return (
                <AccountMenu userName={name} userEmail={email} userAvatar={imageUrl} logOut={logOut} />
            );
        
        default: {
            return (
                <div id="signin_btn" className="usr-icon" />
            );
        }
    }
};

export default Login;
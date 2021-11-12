import { useEffect, useState } from 'react';
import { loadGoogleScript } from '../lib/GoogleLogin';
import Form from './Form';

const Login = () => {
    const [gapi, setGapi] = useState();
    const [googleAuth, setGoogleAuth] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState();

    const onLogIn = (googleUser) => {
        setIsLoggedIn(true);
        const profile = googleUser.getBasicProfile();
        setName(profile.getName());
        setEmail(profile.getEmail());
        setImageUrl(profile.getImageUrl());
    };

    const onFail = () => {
        setIsLoggedIn(false);
    }

    const logOut = () => {
        (async () => {
            await googleAuth.signOut();
            setIsLoggedIn(false);
            renderSigninButton(gapi);
        })();
    };

    const renderSigninButton = (_gapi) => {
        _gapi.signin2.render('signin_button', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onLogIn,
            'onfailure': onFail
        });
    }

    useEffect(() => {
        window.onGoogleScriptLoad = () => {
            const _gapi = window.gapi;
            setGapi(_gapi);
            _gapi.load('auth2', () => {
                (async () => {
                    const _googleAuth = await _gapi.auth2.init({
                        client_id: process.env.REACT_APP_GOOGLE_ID
                    });
                    setGoogleAuth(_googleAuth);
                    renderSigninButton(_gapi);
                })();
            });
        }

        loadGoogleScript();

    }, []);

    return (
        <div>
            {!isLoggedIn &&
                <div id="signin_button"></div>
            }

            {isLoggedIn &&
                <div>
                    <div>
                        <img src={imageUrl} />
                    </div>
                    <div>{name}</div>
                    <div>{email}</div>
                    <Form />
                    <button onClick={logOut}>Log Out</button>
                </div>
            }
        </div>
    )
};

export default Login;
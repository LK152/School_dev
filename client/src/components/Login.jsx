import { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Home from './Home';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            userInfo: {
                name: '',
                emailId: '',
            },
        };
    }

    responseGoogleSuccess = (response) => {
        let userInfo = {
            name: response.profileObj.name,
            emailId: response.profileObj.email,
        };
        this.setState({ userInfo, isLoggedIn: true });
    };

    responseGoogleError = (response) => {
        console.log(response);
    };
    Î;
    logout = (response) => {
        console.log(response);
        let userInfo = {
            name: '',
            emailId: '',
        };
        this.setState({ userInfo, isLoggedIn: false });
    };

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? (
                    <>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                margin: 10,
                            }}
                        >
                            <GoogleLogout
                                clientId={CLIENT_ID}
                                buttonText={'登出 ' + this.state.userInfo.emailId}
                                onLogoutSuccess={this.logout}
                            />
                        </div>
                        {/^u+[0-9]+@lssh.tp.edu.tw$/.test(this.state.userInfo.emailId) ? (
                            <Home Auth={this.state.isLoggedIn} Warning={false} />
                        ) : (
                            <Home Auth={false} Warning={true} />
                        )}
                    </>
                ) : (
                    <>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                margin: 10,
                            }}
                        >
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                buttonText="登入"
                                onSuccess={this.responseGoogleSuccess}
                                onFailure={this.responseGoogleError}
                                isSignedIn={true}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <Home Auth={this.state.isLoggedIn} />
                    </>
                )}
            </div>
        );
    }
}
export default Login;

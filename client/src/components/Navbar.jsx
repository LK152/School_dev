import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Divider,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Button,
    Typography,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
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

const Navbar = (props) => {
    const [state, setState] = useState(State);

    const responseGoogleSuccess = (res) => {
        let userInfo = {
            name: res.profileObj.name,
            emailId: res.profileObj.email,
            imgUrl: res.profileObj.imageUrl,
        };
        setState({ ...state, isLoggedIn: true, userInfo: userInfo });
        props.auth(true);
        props.id(userInfo.emailId.substring(1, 9));
    };

    const responseGoogleError = (res) => {
        console.log(res);
    };

    const logout = (res) => {
        console.log(res);
        let userInfo = {
            name: '',
            emailId: '',
            imgUrl: '',
        };
        setState({
            ...state,
            isLoggedIn: false,
            canClick: false,
            userInfo: userInfo,
        });
        props.auth(false);
    };

    const handleClose = () => {
        setState({ ...state, anchorEl: null });
    };

    const handleClick = (e) => {
        setState({ ...state, anchorEl: e.currentTarget, canClick: true });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        to="/"
                        component={Link}
                        color="common.white"
                        sx={{ textDecoration: 'none', ml: 2 }}
                    >
                        首頁
                    </Typography>
                    <Typography
                        to="/self-learning-form"
                        component={Link}
                        color="common.white"
                        sx={{ textDecoration: 'none', ml: 2 }}
                    >
                        自主學習表單
                    </Typography>
                    <Typography
                        to="/self-learning-results"
                        component={Link}
                        color="common.white"
                        sx={{ textDecoration: 'none', ml: 2 }}
                    >
                        自主學習結果
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <div>
                        {state.isLoggedIn === false ? (
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                onSuccess={responseGoogleSuccess}
                                onFailure={responseGoogleError}
                                isSignedIn={true}
                                hostedDomain="lssh.tp.edu.tw"
                                cookiePolicy="single_host_origin"
                                render={(renderProps) => (
                                    <Button
                                        color="inherit"
                                        onClick={renderProps.onClick}
                                    >
                                        登入
                                    </Button>
                                )}
                            />
                        ) : (
                            <>
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                >
                                    <Avatar src={state.userInfo.imgUrl} />
                                </IconButton>
                                <Menu
                                    anchorEl={state.anchorEl}
                                    open={
                                        state.canClick === true &&
                                        Boolean(state.anchorEl)
                                    }
                                    onClose={handleClose}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            src={state.userInfo.imgUrl}
                                            sx={{ width: 64, height: 64 }}
                                        />
                                        <Typography sx={{ mx: 2, my: 1 }}>
                                            {state.userInfo.name.substring(10)}
                                        </Typography>
                                        <Typography sx={{ mx: 2, my: 1 }}>
                                            {state.userInfo.emailId}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <GoogleLogout
                                        clientId={CLIENT_ID}
                                        render={(renderProps) => (
                                            <MenuItem
                                                onClick={renderProps.onClick}
                                            >
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                登出
                                            </MenuItem>
                                        )}
                                        onLogoutSuccess={logout}
                                        icon={false}
                                    ></GoogleLogout>
                                </Menu>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;

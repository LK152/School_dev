import { useContext, useEffect } from 'react';
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
import { db } from '../config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import { Logout } from '@mui/icons-material';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import { ModalContext } from '../context/ModalContext';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;

const Navbar = () => {
    const { infoObj, userInfoObj } = useContext(ModalContext);
    const [info, setInfo] = infoObj;
    const [userInfo, setUser] = userInfoObj;

    useEffect(
        () =>
            onSnapshot(
                doc(db, 'userData', 'learningplan@lssh.tp.edu.tw'),
                (snapshot) => {
                    if (snapshot.exists()) {
                        setUser(snapshot.data());
					}
					console.log(snapshot.data())
                }
            ),
        [info.userInfo.emailId, setUser]
    );

    const responseGoogleSuccess = (res) => {
        let userInfo = {
            name: res.profileObj.name,
            emailId: res.profileObj.email,
            imgUrl: res.profileObj.imageUrl,
            studentId: res.profileObj.email.substring(1, 9),
        };
        setInfo({ ...info, isLoggedIn: true, userInfo: userInfo });
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
        setInfo({
            ...info,
            isLoggedIn: false,
            canClick: false,
            userInfo: userInfo,
        });
    };

    const handleClose = () => {
        setInfo({ ...info, anchorEl: null });
    };

    const handleClick = (e) => {
        setInfo({ ...info, anchorEl: e.currentTarget, canClick: true });
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
                        {info.isLoggedIn === false ? (
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                onSuccess={responseGoogleSuccess}
                                onFailure={responseGoogleError}
                                isSignedIn={true}
                                hostedDomain="lssh.tp.edu.tw"
                                cookiePolicy="single_host_origin"
                                render={(renderProps) => (
                                    <Button
                                        onClick={renderProps.onClick}
                                        sx={{ color: 'common.white' }}
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
                                    <Avatar src={info.userInfo.imgUrl} />
                                </IconButton>
                                <Menu
                                    anchorEl={info.anchorEl}
                                    open={
                                        info.canClick === true &&
                                        Boolean(info.anchorEl)
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
                                            src={info.userInfo.imgUrl}
                                            sx={{ width: 64, height: 64 }}
                                        />
                                        <Typography sx={{ mx: 2, my: 1 }}>
                                            {info.userInfo.name.substring(10)}
                                        </Typography>
                                        <Typography sx={{ mx: 2, my: 1 }}>
                                            {info.userInfo.emailId}
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

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
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../service/firestore';
import { ModalContext } from '../context/ModalContext';

const Navbar = () => {
    const { infoObj } = useContext(ModalContext);
    const [info, setInfo] = infoObj;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let userInfo = {
                    name: user.displayName,
                    email: user.email,
                    imgURL: user.photoURL,
                    studentId: user.email.substring(1, 9),
                };
    
                setInfo({ ...info, isLoggedIn: true, userInfo: userInfo });
            } else {
                signOutWithGoogle();
            }
        });
    });

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
    };

    const signOutWithGoogle = async () => {
        await signOut(auth).then(() => {
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
                            <Button
                                onClick={signInWithGoogle}
                            >
                                <Typography color="common.white">
                                    登入
                                </Typography>
                            </Button>
                        ) : (
                            <>
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                >
                                    <Avatar src={info.userInfo.imgURL} />
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
                                            src={info.userInfo.imgURL}
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
                                    <MenuItem onClick={signOutWithGoogle}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        登出
                                    </MenuItem>
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

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
import { Logout, Mail } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useModalContext } from '../context/ModalContext';
import { auth } from '../service/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    hd: 'lssh.tp.edu.tw',
    prompt: 'select_account',
});
auth.languageCode = 'it';

const initialState = {
    anchorEl: null,
    canClick: false,
};

const Navbar = () => {
    const { infoObj, boolObj, adminObj } = useModalContext();
    const [info] = infoObj;
    const [isUser] = boolObj;
    const [isAdmin] = adminObj;
    const [state, setState] = useState(initialState);
    const [mailState, setMailState] = useState(initialState);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate('/');
    };

    const signOutWithGoogle = async () => {
        await signOut(auth).then(() => {
            setState(initialState);
        });
    };

    const handleClose = () => {
        setState({ ...state, anchorEl: null });
    };

    const handleClick = (e) => {
        setState({ ...state, anchorEl: e.currentTarget, canClick: true });
    };

    const handleMailClose = () => {
        setMailState({ ...mailState, anchorEl: null });
    };

    const handleMailClick = (e) => {
        setMailState({
            ...mailState,
            anchorEl: e.currentTarget,
            canClick: true,
        });
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
                    {(isUser || isAdmin) && (
                        <Typography
                            to="/dashboard"
                            component={Link}
                            color="common.white"
                            sx={{ textDecoration: 'none', ml: 2 }}
                        >
                            Dashboard
                        </Typography>
                    )}
                    {isAdmin && (
                        <Typography
                            to="/users"
                            component={Link}
                            color="common.white"
                            sx={{ textDecoration: 'none', ml: 2 }}
                        >
                            管理用戶
                        </Typography>
                    )}
                    {(!isUser && !isAdmin) && info && (
                        <Typography
                            to="/self-learning-form"
                            component={Link}
                            color="common.white"
                            sx={{ textDecoration: 'none', ml: 2 }}
                        >
                            自主學習表單
                        </Typography>
                    )}
                    {(!isUser && !isAdmin) && info && (
                        <Typography
                            to="/self-learning-results"
                            component={Link}
                            color="common.white"
                            sx={{ textDecoration: 'none', ml: 2 }}
                        >
                            自主學習紀錄
                        </Typography>
                    )}
                    <div style={{ flexGrow: 1 }} />
                    <div>
                        {!info ? (
                            <Button onClick={signInWithGoogle}>
                                <Typography color="common.white">
                                    登入
                                </Typography>
                            </Button>
                        ) : (
                            <>
                                <IconButton
                                    onClick={handleMailClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    color="secondary"
                                >
                                    <Mail />
                                </IconButton>
                                <Menu
                                    anchorEl={mailState.anchorEl}
                                    open={
                                        mailState.canClick === true &&
                                        Boolean(mailState.anchorEl)
                                    }
                                    onClose={handleMailClose}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    ></Box>
                                </Menu>
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                >
                                    <Avatar src={info.photoURL} />
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
                                            src={info.photoURL}
                                            sx={{ width: 64, height: 64 }}
                                        />
                                        <Typography sx={{ mx: 2, my: 1 }}>
                                            {info.displayName}
                                        </Typography>
                                        <Typography sx={{ mx: 2, my: 1 }}>
                                            {info.email}
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

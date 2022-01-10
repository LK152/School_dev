import '../../App.css';
import { useContext, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Avatar,
    Button,
    Typography,
    styled,
} from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';
import { auth } from '../../service/firestore';
import { signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    hd: 'lssh.tp.edu.tw',
    prompt: 'select_account',
});
auth.languageCode = 'it';

const NavButton = styled(Button)({
    borderRadius: 20,
    '&:hover': {
        border: 'solid 2px #FFF',
    },
});

const Navbar = () => {
    const { infoObj, boolObj } = useContext(ModalContext);
    const [info] = infoObj;
    const [isUser] = boolObj;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithRedirect(auth, provider);
    };

    const signOutWithGoogle = async () => {
        await signOut(auth);
        handleClick();
    };

    const handleClick = () => {
        setOpen(!open);
        document.querySelector('body').style.position = !open
            ? 'fixed'
            : 'unset';
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleClick}>
                        {open ? <Close /> : <Menu />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ul className={open ? 'navDropdown active' : 'navDropdown'}>
                <li>
                    {info ? (
                        info.photoURL !== null && (
                            <Avatar
                                src={info.photoURL}
                                sx={{ width: 72, height: 72, my: 3 }}
                            />
                        )
                    ) : (
                        <NavButton
                            onClick={signInWithGoogle}
                            color="secondary"
                            variant="outlined"
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className="navLink" variant="h4">
                                學生登入
                            </Typography>
                        </NavButton>
                    )}
                </li>
                <li>
                    {!info && (
                        <NavButton
                            onClick={() => {
                                navigate('/user-login');
                                handleClick();
                            }}
                            color="secondary"
                            variant="outlined"
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className="navLink" variant="h4">
                                教師登入
                            </Typography>
                        </NavButton>
                    )}
                </li>
                <li>
                    <NavButton
                        onClick={handleClick}
                        to="/"
                        component={Link}
                        color="secondary"
                        variant="outlined"
                        sx={{ border: 2, my: 3, width: '65vw' }}
                    >
                        <Typography className="navLink" variant="h4">
                            首頁
                        </Typography>
                    </NavButton>
                </li>
                <li>
                    {isUser && info && (
                        <NavButton
                            onClick={handleClick}
                            to="/dashboard"
                            component={Link}
                            color="secondary"
                            variant="outlined"
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className="navLink" variant="h4">
                                Dashboard
                            </Typography>
                        </NavButton>
                    )}
                </li>
                <li>
                    {info && !isUser && (
                        <NavButton
                            onClick={handleClick}
                            to="/self-learning-form"
                            component={Link}
                            color="secondary"
                            variant="outlined"
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className="navLink" variant="h4">
                                自主學習表單
                            </Typography>
                        </NavButton>
                    )}
                </li>
                <li>
                    {info && !isUser && (
                        <NavButton
                            onClick={handleClick}
                            to="/self-learning-results"
                            component={Link}
                            color="secondary"
                            variant="outlined"
                            sx={{ border: 2, my: 3, width: '65vw' }}
                        >
                            <Typography className="navLink" variant="h4">
                                自主學習紀錄
                            </Typography>
                        </NavButton>
                    )}
                </li>
                <li>
                    {info &&
                        (isUser ? (
                            <NavButton
                                onClick={() => {
                                    signOut(auth);
                                    navigate('/');
                                }}
                                color="secondary"
                                variant="outlined"
                                sx={{ border: 2, my: 3, width: '65vw' }}
                            >
                                <Typography className="navLink" variant="h4">
                                    登出
                                </Typography>
                            </NavButton>
                        ) : (
                            <NavButton
                                onClick={signOutWithGoogle}
                                color="secondary"
                                variant="outlined"
                                sx={{ border: 2, my: 3, width: '65vw' }}
                            >
                                <Typography className="navLink" variant="h4">
                                    登出
                                </Typography>
                            </NavButton>
                        ))}
                </li>
            </ul>
        </Box>
    );
};

export default Navbar;

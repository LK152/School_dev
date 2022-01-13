import '../../App.css';
import { useState } from 'react';
import {
	AppBar,
	Toolbar,
	Box,
	Menu,
	IconButton,
	Avatar,
	Button,
	Typography,
	styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Close, Mail } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useModalContext } from '../../context/ModalContext';
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

const initialState = {
	anchorEl: null,
	canClick: false,
};

const Navbar = () => {
	const { infoObj, boolObj, adminObj } = useModalContext();
	const [info] = infoObj;
	const [isUser] = boolObj;
	const [isAdmin] = adminObj;
	const [open, setOpen] = useState(false);
	const [mailState, setMailState] = useState(initialState);
	const navigate = useNavigate();

	const signInWithGoogle = async () => {
		await signInWithRedirect(auth, provider);
		navigate('/');
	};

	const signOutWithGoogle = async () => {
		await signOut(auth);
		handleClick();
		navigate('/');
	};

	const handleClick = () => {
		setOpen(!open);
		document.querySelector('body').style.position = !open
			? 'fixed'
			: 'unset';
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
			<AppBar position='static'>
				<Toolbar>
					<IconButton onClick={handleClick}>
						{open ? <Close /> : <MenuIcon />}
					</IconButton>
					<div style={{ flexGrow: 1 }} />
					{info && (
						<>
							<IconButton
								onClick={handleMailClick}
								size='small'
								sx={{ ml: 2 }}
								color='inherit'
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
						</>
					)}
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
							color='secondary'
							variant='outlined'
							sx={{ border: 2, my: 3, width: '65vw' }}
						>
							<Typography className='navLink' variant='h4'>
								登入
							</Typography>
						</NavButton>
					)}
				</li>
				<li>
					<NavButton
						onClick={handleClick}
						to='/'
						component={Link}
						color='secondary'
						variant='outlined'
						sx={{ border: 2, my: 3, width: '65vw' }}
					>
						<Typography className='navLink' variant='h4'>
							首頁
						</Typography>
					</NavButton>
				</li>
				<li>
					{(isUser || isAdmin) && info && (
						<NavButton
							onClick={handleClick}
							to='/dashboard'
							component={Link}
							color='secondary'
							variant='outlined'
							sx={{ border: 2, my: 3, width: '65vw' }}
						>
							<Typography className='navLink' variant='h4'>
								Dashboard
							</Typography>
						</NavButton>
					)}
				</li>
				<li>
					{(isUser || isAdmin) && !isUser && (
						<NavButton
							onClick={handleClick}
							to='/self-learning-form'
							component={Link}
							color='secondary'
							variant='outlined'
							sx={{ border: 2, my: 3, width: '65vw' }}
						>
							<Typography className='navLink' variant='h4'>
								自主學習表單
							</Typography>
						</NavButton>
					)}
				</li>
				<li>
					{info && !isUser && !isAdmin && (
						<NavButton
							onClick={handleClick}
							to='/self-learning-results'
							component={Link}
							color='secondary'
							variant='outlined'
							sx={{ border: 2, my: 3, width: '65vw' }}
						>
							<Typography className='navLink' variant='h4'>
								自主學習紀錄
							</Typography>
						</NavButton>
					)}
				</li>
				<li>
					{info && (
						<NavButton
							onClick={signOutWithGoogle}
							color='secondary'
							variant='outlined'
							sx={{ border: 2, my: 3, width: '65vw' }}
						>
							<Typography className='navLink' variant='h4'>
								登出
							</Typography>
						</NavButton>
					)}
				</li>
			</ul>
		</Box>
	);
};

export default Navbar;

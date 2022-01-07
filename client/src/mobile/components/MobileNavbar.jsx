import { useContext, useState } from 'react';
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
import { ModalContext } from '../../context/ModalContext';
import { auth } from '../../service/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	hd: 'lssh.tp.edu.tw',
});

const Navbar = () => {
	const { infoObj } = useContext(ModalContext);
	const [info] = infoObj;
	const [state, setState] = useState({
		anchorEl: null,
		canClick: false,
	});

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, provider);
	};

	const signOutWithGoogle = async () => {
		await signOut(auth);
	};

	const handleClose = () => {
		setState({ ...state, anchorEl: null });
	};

	const handleClick = (e) => {
		setState({ ...state, anchorEl: e.currentTarget, canClick: true });
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						to='/'
						component={Link}
						color='common.white'
						sx={{ textDecoration: 'none', ml: 2 }}
					>
						首頁
					</Typography>
					<Typography
						to='/self-learning-form'
						component={Link}
						color='common.white'
						sx={{ textDecoration: 'none', ml: 2 }}
					>
						自主學習表單
					</Typography>
					<Typography
						to='/self-learning-results'
						component={Link}
						color='common.white'
						sx={{ textDecoration: 'none', ml: 2 }}
					>
						自主學習結果
					</Typography>
					<div style={{ flexGrow: 1 }} />
					<div>
						{!info ? (
							<Button onClick={signInWithGoogle}>
								<Typography color='common.white'>
									登入
								</Typography>
							</Button>
						) : (
							<>
								<IconButton
									onClick={handleClick}
									size='small'
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
											{info.displayName.substring(10)}
										</Typography>
										<Typography sx={{ mx: 2, my: 1 }}>
											{info.email}
										</Typography>
									</Box>
									<Divider />
									<MenuItem onClick={signOutWithGoogle}>
										<ListItemIcon>
											<Logout fontSize='small' />
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

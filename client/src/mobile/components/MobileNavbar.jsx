import { useContext, useState } from 'react';
import {
	AppBar,
	Toolbar,
	Box,
	Divider,
	IconButton,
	Avatar,
	ListItemIcon,
	Button,
	Typography,
} from '@mui/material';
import { Logout, Menu, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';
import { auth } from '../../service/firestore';
import { signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth';

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
		await signInWithRedirect(auth, provider);
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
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;

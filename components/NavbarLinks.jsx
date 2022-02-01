import { useState } from 'react';
import {
	Stack,
	Toolbar,
	Typography,
	Button,
	Menu,
	MenuItem,
	Avatar,
	IconButton,
	Box,
	Divider,
	ListItemIcon,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import NextMuiLink from './NextMuiLink';
import theme from '@styles/theme';
import useAuth from '@src/context/AuthContext';

const init = {
	anchorEl: null,
	canClick: false,
};

const NavbarLinks = ({ navLinks }) => {
	const { user, loginWithGoogleBrowser, logout } = useAuth();
	const [state, setState] = useState(init);

	const handleClose = () => {
		setState({ ...state, anchorEl: null });
	};

	const handleClick = (e) => {
		setState({ ...state, anchorEl: e.currentTarget, canClick: true });
	};

	return (
		<Toolbar
			component='nav'
			sx={{
				[theme.breakpoints.down('browser')]: {
					display: 'none',
				},
			}}
		>
			<Stack direction='row' spacing={2}>
				{navLinks.map(({ title, path }, i) => (
					<NextMuiLink
						key={`${title}${i}`}
						href={path}
						variant='button'
					>
						<Typography
							color='secondary'
							sx={{ textDecoration: 'none' }}
						>
							{title}
						</Typography>
					</NextMuiLink>
				))}
			</Stack>
			<div style={{ flexGrow: 1 }} />
			{!user ? (
				<Button onClick={loginWithGoogleBrowser}>
					<Typography color='common.white'>登入</Typography>
				</Button>
			) : (
				<>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
					>
						<Avatar src={user?.photoURL} />
					</IconButton>
					<Menu
						anchorEl={state.anchorEl}
						open={
							state.canClick === true && Boolean(state.anchorEl)
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
								src={user?.photoURL}
								sx={{ width: 64, height: 64 }}
							/>
							<Typography sx={{ mx: 2, my: 1 }}>
								{user?.displayName}
							</Typography>
							<Typography sx={{ mx: 2, my: 1 }}>
								{user?.email}
							</Typography>
						</Box>
						<Divider />
						<MenuItem onClick={logout}>
							<ListItemIcon>
								<Logout fontSize='small' />
							</ListItemIcon>
							登出
						</MenuItem>
					</Menu>
				</>
			)}
		</Toolbar>
	);
};

export default NavbarLinks;

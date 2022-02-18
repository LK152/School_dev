import { Box, AppBar } from '@mui/material';
import NavbarLinks from './NavbarLinks';
import TopDrawer from './TopDrawer';
import useAuth from '@src/context/AuthContext';
import useStateContext from '@src/context/StateContext';

const Navbar = () => {
	const { user } = useAuth();
	const { authState } = useStateContext();
	const navLinks = [
		{ title: '首頁', path: '/' },
		...(user
			? !authState.isAdmin && !authState.isTeacher
				? [
						{ title: '自主學習表單', path: '/Form' },
						{ title: '自主學習紀錄', path: '/Result' },
				  ]
				: [
						{ title: '分組', path: '/Grouping' },
						{ title: '管理用戶', path: '/admin/Users' },
						{ title: '管理選項', path: '/admin/DataOptions' },
				  ]
			: []),
	];
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<NavbarLinks navLinks={navLinks} />
				<TopDrawer navLinks={navLinks} />
			</AppBar>
		</Box>
	);
};

export default Navbar;

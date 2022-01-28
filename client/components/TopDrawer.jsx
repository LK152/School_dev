import { useState } from 'react';
import { Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import styles from '../styles/TopDrawer.module.css';
import NextMuiLink from './NextMuiLink';
import theme from '../styles/theme';
import axios from 'axios';

const TopDrawer = ({ navLinks }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
		document.querySelector('body').style.position = !open
			? 'fixed'
			: 'unset';
	};

	return (
		<>
			<Toolbar
				sx={{
					[theme.breakpoints.up('browser')]: {
						display: 'none',
					},
				}}
			>
				<IconButton onClick={handleClick}>
					{open ? (
						<Close color='secondary' />
					) : (
						<Menu color='secondary' />
					)}
				</IconButton>
				<div style={{ flexGrow: 1 }} />
				<Button color='secondary'>
					<Typography>登入</Typography>
				</Button>
			</Toolbar>
			<ul className={open ? styles.TopDrawerActive : styles.TopDrawer}>
				{navLinks.map(({ title, path }, i) => (
					<NextMuiLink
						key={`${title}${i}`}
						href={path}
						variant='button'
					>
						<li>
							<Button
								onClick={handleClick}
								color='secondary'
								sx={{
									border: 2,
									my: 3,
									width: '65vw',
									borderRadius: 20,
								}}
							>
								<Typography
									color='secondary'
									variant='h4'
									sx={{
										textDecoration: 'none',
									}}
								>
									{title}
								</Typography>
							</Button>
						</li>
					</NextMuiLink>
				))}
			</ul>
		</>
	);
};

export default TopDrawer;

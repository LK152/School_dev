import { useState, useEffect } from 'react';
import {
	Grid,
	TextField,
	FilledInput,
	InputAdornment,
	IconButton,
	InputLabel,
	FormControl,
	Typography,
	Card,
	CardContent,
	Container,
	Button,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginUser from '../api/LoginUser';
import { useNavigate } from 'react-router-dom';
import useLocalState from '../hooks/useLocalState';
import { db } from '../service/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { useModalContext } from '../context/ModalContext';
import '../App.css';

const init = {
	email: '',
	password: '',
	remember: false,
};

const Login = () => {
	const { adminObj } = useModalContext();
	const [isAdmin, setIsAdmin] = adminObj;
	const [localUser, setLocalUser] = useLocalState('localUser', null);
	const [user, setUser] = useState(localUser ?? init);
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	useEffect(
		() =>
			onSnapshot(doc(db, 'userData', user.email), (snapshot) => {
				if (snapshot.exists()) {
					setIsAdmin(snapshot.data().isAdmin);
				}
			}),
		[user.email, setIsAdmin]
	);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleShowPassword = () => {
		setShow(!show);
	};

	const handleRemember = (e) => {
		setUser({ ...user, remember: e.target.checked });
	};

	const handleLogin = (e) => {
		e.preventDefault();
		LoginUser(user)
			.then(() => {
				setLocalUser(user.remember ? user : null);
				setUser(init);
				navigate('/dashboard');
			})
			.catch((err) => {
				console.log(err.message);
				alert(err.message);
			});
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<form onSubmit={handleLogin}>
						<Grid container direction='column' spacing={2}>
							<Grid item>
								<Typography variant='h2' align='center'>
									教師登入
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<TextField
										variant='filled'
										label='Email'
										name='email'
										value={user.email}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth variant='filled'>
									<InputLabel>密碼</InputLabel>
									<FilledInput
										type={show ? 'text' : 'password'}
										name='password'
										value={user.password}
										onChange={handleChange}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													onClick={handleShowPassword}
												>
													{show ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item container justifyContent='space-between'>
								<Grid item>
									<FormControlLabel
										onChange={handleRemember}
										control={
											<Checkbox
												defaultChecked={user.remember}
											/>
										}
										label='記住我'
										defaultChecked
									/>
								</Grid>
								<Grid item>
									<Button
										type='submit'
										variant='contained'
										disabled={
											user.email === '' ||
											user.password === ''
										}
									>
										登入
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Login;

import { useState } from 'react';
import {
	Container,
	Card,
	CardContent,
	Grid,
	Typography,
	FormControl,
	TextField,
	InputLabel,
	IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Delete } from '@mui/icons-material';
import UsersTable from './UsersTable';
import Select from './Select';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { useNavigate } from 'react-router-dom';
import { permit, teachers } from './Options';
import { useModalContext } from '../context/ModalContext';

const init = {
	email: '',
	isAdmin: false,
	userClass: '',
};

const Users = () => {
	const [newUser, setNewUser] = useState(init);
	const [loading, setLoading] = useState(false);
	const { updateObj, authObj } = useModalContext();
	const [update, setUpdate] = updateObj;
	const [authState] = authObj;
	const navigate = useNavigate();

	const axios = rateLimit(Axios.create(), {
		maxRequests: 2,
		perMilliseconds: 1000,
		maxRPS: 2,
	});

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handleDelete = () => {
		setNewUser(init);
	};

	const handleAddUser = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (authState.isAdmin) {
			await axios
				.post(
					process.env.REACT_APP_API_URL + '/addUser/' + newUser.email,
					newUser
				)
				.then(() => {
					setNewUser(init);
					setLoading(false);
					setUpdate(!update);
				})
				.catch((err) => alert(err.response.data.error));
		} else {
			alert('not authorized');
			navigate('/');
		}
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' spacing={2}>
						<Grid item>
							<Typography variant='h3' textAlign='center'>
								用戶
							</Typography>
						</Grid>
						<Grid item>
							<UsersTable />
						</Grid>
						<Grid
							item
							container
							direction='row'
							justifyContent='space-evenly'
							alignItems='center'
							spacing={2}
						>
							<Grid item sm={4} xs={12}>
								<FormControl fullWidth>
									<TextField
										onChange={handleChange}
										name='email'
										variant='outlined'
										label='Email'
										value={newUser.email} 
										autoComplete='off'
									/>
								</FormControl>
							</Grid>
							<Grid item sm={4} xs={12}>
								<FormControl fullWidth>
									<InputLabel>權限</InputLabel>
									<Select
										label='權限'
										options={permit}
										value={newUser.isAdmin}
										name='isAdmin'
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							{!newUser.isAdmin && (
								<Grid item sm={4} xs={12}>
									<FormControl fullWidth>
										<InputLabel>導師</InputLabel>
										<Select
											label='導師'
											options={teachers}
											value={newUser.userClass}
											name='userClass'
											onChange={handleChange}
										/>
									</FormControl>
								</Grid>
							)}
							<Grid item>
								<LoadingButton
									onClick={handleAddUser}
									loading={loading}
									variant='contained'
									disabled={
										newUser.email === '' ||
										!/^[A-Za-z0-9._%+-]+@lssh.tp.edu.tw$/.test(
											newUser.email
										) ||
										(!newUser.isAdmin &&
											newUser.userClass === '')
									}
								>
									<Typography color='common.white'>
										新增用戶
									</Typography>
								</LoadingButton>
							</Grid>
							<Grid item>
								<IconButton onClick={handleDelete}>
									<Delete />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Users;

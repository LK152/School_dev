import { useState } from 'react';
import {
	Container,
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
	FormControl,
	TextField,
	InputLabel,
	IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import UsersTable from './UsersTable';
import Select from './Select';
import axios from 'axios';
import { permit, classes } from './Options';
import { useModalContext } from '../context/ModalContext';

const init = {
	email: '',
	isAdmin: false,
	userClass: '',
};

const Users = () => {
	const [newUser, setNewUser] = useState(init);
	const { updateObj } = useModalContext();
	const [update, setUpdate] = updateObj;

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handleDelete = () => {
		setNewUser(init);
	};

	const handleAddUser = async (e) => {
		e.preventDefault();

		await axios
			.post(
				process.env.REACT_APP_API_URL + '/addUser/' + newUser.email,
				newUser
			)
			.then(() => {
				setNewUser(init);
				setUpdate(!update);
			});
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
							<UsersTable update={update} />
						</Grid>
						<Grid
							item
							container
							direction='row'
							justifyContent='space-evenly'
							alignItems='center'
						>
							<Grid item xs={3}>
								<FormControl fullWidth>
									<TextField
										onChange={handleChange}
										name='email'
										variant='filled'
										label='Email'
										value={newUser.email}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel>班級</InputLabel>
									<Select
										label='班級'
										options={classes}
										value={newUser.userClass}
										name='userClass'
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={3}>
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
							<Grid item>
								<Button
									onClick={handleAddUser}
									variant='contained'
									disabled={
										newUser.email === '' ||
										!/^[A-Za-z0-9._%+-]+@lssh.tp.edu.tw$/.test(
											newUser.email
										)
									}
								>
									新增用戶
								</Button>
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

import { withAdmin } from '../../src/hook/route';
import { useState, useEffect } from 'react';
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
	Autocomplete,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Delete } from '@mui/icons-material';
import UsersTable from '../../components/UsersTable';
import Select from '../../components/Select';
import axios from 'axios';
import { permit, teachers } from '../../data/Option';
import { useRouter } from 'next/router';
import useAuth from '../../src/context/AuthContext';
import useStateContext from '../../src/context/StateContext';

const init = {
	email: '',
	isAdmin: false,
	teacherClass: '',
};

const Users = () => {
	const [newUser, setNewUser] = useState(init);
	const [loading, setLoading] = useState(false);
	const [emailInput, setEmailInput] = useState('');
	const [listOfUsers, setLOU] = useState([]);
	const { user } = useAuth();
	const { authState } = useStateContext();
	const { isAdmin } = authState;
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(`/api/admin/${user?.uid}`)
				.then((users) => {
					const Users = [];

					users.data.forEach((User) => Users.push(User.email));
					setLOU(Users);
				})
				.catch((err) => console.log(err));
		};

		fetchData();

		return () => setLOU([]);
	}, [user]);

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handleDelete = () => {
		setNewUser(init);
	};

	const handleAddUser = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (isAdmin) {
			await axios
				.post(`/api/admin/${newUser.email}`, {
					isTeacher: !newUser.isAdmin,
					...newUser,
				})
				.catch((err) => alert(err.response.data.error));

			setNewUser(init);
			setLoading(false);
		} else {
			alert('not authorized');
			router.replace('/');
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
									<Autocomplete
										freeSolo
										value={newUser.email}
										onChange={(_e, newValue) =>
											setNewUser({
												...newUser,
												email: newValue,
											})
										}
										inputValue={emailInput}
										onInputChange={(_e, newInput) =>
											setEmailInput(newInput)
										}
										options={listOfUsers}
										renderInput={(params) => (
											<TextField
												{...params}
												label='email'
											/>
										)}
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
											value={newUser.teacherClass}
											name='teacherClass'
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
											newUser.teacherClass === '')
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

export default withAdmin(Users);

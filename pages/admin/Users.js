import { withAdmin } from '@src/hook/route';
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
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Delete } from '@mui/icons-material';
import UsersTable from '@components/UsersTable';
import Select from '@components/Select';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStateContext from '@src/context/StateContext';
import useOption from '@src/context/OptionContext';
import { Box } from '@mui/system';

const init = {
	name: '',
	isAdmin: false,
	teacherClass: '',
	teacherGroup: '',
};

const Users = () => {
	const { classes, groups } = useOption();
	const [newUser, setNewUser] = useState(init);
	const [loading, setLoading] = useState(false);
	const [nameInput, setNameInput] = useState('');
	const [listOfUsers, setLOU] = useState([]);
	const { authState } = useStateContext();
	const { isAdmin } = authState;
	const router = useRouter();
	const classesOption = classes?.map((Class) => {
		return { label: Class, value: Class };
	});
	const groupsOption = groups?.map(({ group }) => {
		return { label: group, value: group };
	});

	useEffect(() => {
		axios.get(`/api/admin`).then((users) => {
			setLOU(
				users.data?.map((user) => {
					return { label: user.displayName, value: user.email };
				})
			);
		});

		return () => setLOU([]);
	}, [authState]);

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handleCheck = (e) => {
		setNewUser({ ...newUser, isAdmin: e.target.checked });
	};

	const handleDelete = () => {
		setNewUser(init);
	};

	const handleAddUser = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (isAdmin) {
			await axios
				.post(`/api/admin/${newUser.name.value}`, {
					isTeacher: !newUser.isAdmin,
					isAdmin: newUser.isAdmin,
					name: newUser.name.label,
					teacherClass: newUser.teacherClass,
					teacherGroup: newUser.teacherGroup,
					email: newUser.name.value,
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
						<Box sx={{ minWidth: '80%', m: 'auto', mt: 4 }}>
							<Grid item container direction='column' gap={2}>
								<Grid
									item
									container
									direction='row'
									alignItems='center'
									justifyContent='center'
								>
									<Grid item sm={4} xs={12}>
										<FormControl fullWidth>
											<Autocomplete
												freeSolo
												value={newUser.name}
												onChange={(_e, newValue) =>
													setNewUser({
														...newUser,
														name: newValue,
													})
												}
												inputValue={nameInput}
												onInputChange={(_e, newInput) =>
													setNameInput(newInput)
												}
												options={listOfUsers}
												renderInput={(params) => (
													<TextField
														{...params}
														label='名稱'
													/>
												)}
											/>
										</FormControl>
									</Grid>
									<Grid item ml={2}>
										<FormControlLabel
											checked={newUser.isAdmin}
											onChange={handleCheck}
											control={<Checkbox />}
											label='管理員'
										/>
									</Grid>
								</Grid>

								<Grid
									item
									container
									direction='row'
									alignItems='center'
									justifyContent='center'
									spacing={2}
								>
									<Grid item sm={4} xs={12}>
										<FormControl fullWidth>
											<InputLabel>班級</InputLabel>
											<Select
												label='班級'
												options={classesOption}
												value={newUser.teacherClass}
												name='teacherClass'
												onChange={handleChange}
											/>
										</FormControl>
									</Grid>
									<Grid item sm={4} xs={12}>
										<FormControl fullWidth>
											<InputLabel>組別</InputLabel>
											<Select
												label='組別'
												options={groupsOption}
												value={newUser.teacherGroup}
												name='teacherGroup'
												onChange={handleChange}
											/>
										</FormControl>
									</Grid>
								</Grid>

								<Grid
									item
									container
									direction='row'
									justifyContent='space-evenly'
									alignItems='center'
									spacing={2}
								>
									<Grid item>
										<LoadingButton
											onClick={handleAddUser}
											loading={loading}
											variant='contained'
											disabled={
												newUser.name === '' ||
												!newUser.name ||
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
						</Box>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default withAdmin(Users);

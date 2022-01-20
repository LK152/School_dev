import { useState } from 'react';
import {
	Container,
	Card,
	CardContent,
	Grid,
	Typography,
	FormControl,
	Button,
} from '@mui/material';
import Select from './Select';
import StudentTable from './StudentTable';
import { teachers } from './Options';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';

const Dashboard = () => {
	const [selected, setSelected] = useState([]);
	const [values, setValues] = useState({
		selection: 0,
		selectedGroup: 201,
		group: '',
	});

	const axios = rateLimit(Axios.create(), {
		maxRequests: 2,
		perMilliseconds: 1000,
		maxRPS: 2,
	});

	const teacher = teachers.filter((res) => {
		return res.value === values.selectedGroup;
	});

	const [object] = teacher;

	const handleSelect = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleUpdate = async () => {
		const data = {
			selected: selected,
			group: object.label,
		};

		await axios.post(process.env.REACT_APP_API_URL + '/updateGroup', data);
	};

	const handleDelete = async () => {
		await axios.post(
			process.env.REACT_APP_API_URL + '/deleteGroup',
			selected
		);
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' spacing={2}>
						<Grid item>
							<Typography variant='h3' textAlign='center'>
								學生分組
							</Typography>
						</Grid>
						<Grid item>
							<StudentTable
								values={values}
								selected={selected}
								setSelected={setSelected}
								handleSelect={handleSelect}
							/>
						</Grid>
						<Grid
							item
							container
							direction='row'
							alignItems='center'
							columnSpacing={2}
						>
							<Grid item>
								<Typography variant='h6' sx={{ ml: 2 }}>
									分配組別
								</Typography>
							</Grid>
							<Grid item sm={2} xs={4}>
								<FormControl fullWidth>
									<Select
										name='selectedGroup'
										value={values.selectedGroup}
										options={teachers}
										onChange={handleSelect}
										sx={{ ml: 10 }}
									/>
								</FormControl>
							</Grid>
							<div style={{ flexGrow: 1 }} />
							<Grid
								item
								container
								direction='row'
								justifyContent='space-between'
							>
								<Grid item>
									<Button
										variant='contained'
										disabled={selected.length === 0}
										onClick={handleDelete}
										sx={{ margin: 2 }}
									>
										<Typography color='common.white'>
											刪除
										</Typography>
									</Button>
								</Grid>
								<Grid item>
									<Button
										variant='contained'
										disabled={selected.length === 0}
										onClick={handleUpdate}
										sx={{ margin: 2 }}
									>
										<Typography color='common.white'>
											新增
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Dashboard;

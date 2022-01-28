import { withUser } from '../src/hook/route';
import {
	Container,
	Card,
	CardContent,
	Grid,
	Typography,
	FormControl,
	Button,
} from '@mui/material';
import Select from '../components/Select';
import StudentTable from '../components/StudentTable';
import { teachers } from '../data/Option';
import axios from 'axios';
import useStateContext from '../src/context/StateContext';

const Grouping = () => {
	const { authState, selectedValues, setSelectedValues, selected } =
		useStateContext();
	const { isAdmin } = authState;
	const { selectedGroup } = selectedValues;

	const [teacher] = teachers.filter((res) => {
		return res.value === selectedGroup;
	});

	const handleSelect = (e) => {
		setSelectedValues({
			...selectedValues,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdate = async () => {
		const data = {
			selected: selected,
			group: teacher.label,
		};

		await axios.patch('/api/admin/group', data);
	};

	const handleDelete = async () => {
		await axios.post('/api/admin/group', selected);
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
							<StudentTable handleSelect={handleSelect} />
						</Grid>
						{isAdmin && (
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
								<Grid item sm={4} xs={8}>
									<FormControl fullWidth>
										<Select
											name='selectedGroup'
											value={selectedGroup}
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
						)}
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default withUser(Grouping);

import { withUser } from '@src/hook/route';
import {
	Container,
	Card,
	CardContent,
	Grid,
	Typography,
	FormControl,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Select from '@components/Select';
import StudentTable from '@components/StudentTable';
import TeacherTable from '@components/TeacherTable';
import axios from 'axios';
import useStateContext from '@src/context/StateContext';
import { useState } from 'react';

const Grouping = () => {
	const [addLoading, setAdd] = useState(false);
	const [deleteLoading, setDelete] = useState(false);
	const { authState, selectedValues, setSelectedValues, selectedIds } =
		useStateContext();
	const { isAdmin, isTeacher, teacherClass } = authState;
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
			selected: selectedIds,
			group: teacher.label,
			groupClass: teacher.value,
		};
		setAdd(true);

		await axios.patch('/api/admin/group', data);
		setAdd(false);
	};

	const handleDelete = async () => {
		setDelete(true);

		await axios.post('/api/admin/group', selectedIds);
		setDelete(false);
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' spacing={2}>
						<Grid item>
							<Typography variant='h3' textAlign='center'>
								{isAdmin && !isTeacher
									? '學生分組'
									: teacherClass}
							</Typography>
						</Grid>
						<Grid item>
							<StudentTable handleSelect={handleSelect} />
						</Grid>
						{isAdmin && !isTeacher && (
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
											options={groups}
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
										<LoadingButton
											variant='contained'
											disabled={selectedIds.length === 0}
											onClick={handleDelete}
											sx={{ margin: 2 }}
											loading={deleteLoading}
										>
											<Typography color='common.white'>
												刪除
											</Typography>
										</LoadingButton>
									</Grid>
									<Grid item>
										<LoadingButton
											variant='contained'
											disabled={selectedIds.length === 0}
											onClick={handleUpdate}
											sx={{ margin: 2 }}
											loading={addLoading}
										>
											<Typography color='common.white'>
												新增
											</Typography>
										</LoadingButton>
									</Grid>
								</Grid>
							</Grid>
						)}
					</Grid>
				</CardContent>
			</Card>
			{!isAdmin && isTeacher && (
				<Card raised sx={{ my: 5 }}>
					<CardContent>
						<Grid container direction='column' spacing={2}>
							<Grid item>
								<Typography variant='h3' textAlign='center'>
									{!isAdmin && isTeacher && '組別'}
								</Typography>
							</Grid>
							<Grid item>
								<TeacherTable />
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			)}
		</Container>
	);
};

export default withUser(Grouping);
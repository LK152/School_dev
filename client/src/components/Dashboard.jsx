import { useEffect, useState } from 'react';
import {
	Container,
	Card,
	CardContent,
	Grid,
	Typography,
	Button,
	FormControl,
} from '@mui/material';
import Select from './Select';
import { exportClasses } from './Options';
import StudentDashboard from './StudentDashboard';
import { useModalContext } from '../context/ModalContext';
import { db } from '../service/firestore.js';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import exportXL from '../api/exportXL';

const Dashboard = () => {
	const [values, setValues] = useState({
		selection: 0,
	});
	const { authObj, recordObj } = useModalContext();
	const [authState] = authObj;
	const [studentRecord, setRecord] = recordObj;

	useEffect(() => {
		const unSub = onSnapshot(
			authState.isAdmin
				? values.selection !== 0
					? query(
							collection(db, 'studentData'),
							where('class', '==', values.selection)
					  )
					: collection(db, 'studentData')
				: query(
						collection(db, 'studentData'),
						where('class', '==', authState.class)
				  ),
			(snapshot) => {
				const docs = [];

				if (!snapshot.empty) {
					snapshot.forEach((doc) => {
						docs.push(doc.data());
					});
				} else {
					setRecord([]);
				}

				setRecord(docs);
			}
		);

		return () => unSub();
	}, [setRecord, values, authState]);

	const handleExport = () => {
		exportXL(studentRecord, 'das');
	};

	const handleSelect = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
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
							<StudentDashboard />
						</Grid>
						{authState.isAdmin && (
							<Grid
								item
								container
								direction='row'
								justifyContent='space-between'
							>
								<Grid item>
									<FormControl fullWidth>
										<Select
											name='selection'
											options={exportClasses}
											onChange={handleSelect}
											value={values.selection}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<Button
										color='primary'
										variant='contained'
										onClick={handleExport}
									>
										<Typography color='common.white'>
											匯出
										</Typography>
									</Button>
								</Grid>
							</Grid>
						)}
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Dashboard;

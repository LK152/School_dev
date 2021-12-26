import { useState, useEffect } from 'react';
import {
	IconButton,
	Container,
	Card,
	CardContent,
	Typography,
	Grid,
} from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';
import { db } from '../config/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import DeleteData from '../api/DeleteData';
import { Link } from 'react-router-dom';

const Collection = collection(db, 'studentData');

const Results = (props) => {
	const [users, setUsers] = useState([]);
	const [empty, setEmpty] = useState(false);

	const q = query(Collection, where('studentId', '==', props.id));

	useEffect(() => {
		let isMounted = true;
		const getUsers = async () => {
			const data = await getDocs(q);
			if (isMounted) {
				if (data.empty) {
					setEmpty(true);
				} else {
					setUsers(
						data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
					);
				}
			}
		};

		getUsers();
		return () => {
			isMounted = false;
		};
	}, [q]);

	const renderMember = (num, doc) => {
		const fields = [];
		for (var i = 1; i < num; i++) {
			fields.push(
				<Grid container item direction='row'>
					<Grid item xs={6}>
						<Typography variant='h5' align='center'>
							{'組員' + i}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h5' align='center'>
							{i === 1 ? doc.mem1Class : doc.mem2Class}
							{i === 1 ? doc.mem1Num : doc.mem2Num}
						</Typography>
					</Grid>
				</Grid>
			);
		}

		return <>{fields}</>;
	};

	const handleDelete = () => {
		DeleteData(props.id);
	};

	const handleEdit = () => {
		props.setDoc(users);
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid item xs={12}>
						<Typography variant='h2' align='center'>
							自主學習結果
						</Typography>
					</Grid>
					{empty === false ? (
						users.map((doc, index) => {
							return (
								<>
									<Grid
										container
										direction='column'
										spacing={4} 
										key={index}
									>
										<Grid container item direction='row'>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													班級座號
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													{doc.class}
													{doc.number}
												</Typography>
											</Grid>
										</Grid>
										<Grid container item direction='row'>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													主題
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													{doc.topic}
												</Typography>
											</Grid>
										</Grid>
										<Grid container item direction='row'>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													副主題
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													{doc.subTopic}
												</Typography>
											</Grid>
										</Grid>
										<Grid container item direction='row'>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													組員人數
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													variant='h5'
													align='center'
												>
													{doc.members}
												</Typography>
											</Grid>
										</Grid>
										{renderMember(doc.members, doc)}
										<Grid
											container
											item
											direction='row'
											justifyContent='space-between'
										>
											<Grid item>
												<IconButton
													onClick={handleDelete}
												>
													<DeleteForever />
												</IconButton>
											</Grid>
											<Grid item>
												<IconButton
													component={Link}
													to='/self-learning-edit'
													onClick={handleEdit}
												>
													<Edit />
												</IconButton>
											</Grid>
										</Grid>
									</Grid>
								</>
							);
						})
					) : (
						<Grid item xs={12}>
							<Typography variant='h1' align='center'>
								無表單紀錄
							</Typography>
						</Grid>
					)}
				</CardContent>
			</Card>
		</Container>
	);
};

export default Results;

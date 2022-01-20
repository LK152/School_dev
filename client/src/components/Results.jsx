import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	IconButton,
	Container,
	Card,
	CardContent,
	Typography,
	Grid,
	Dialog,
	DialogActions,
	DialogTitle,
} from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';
import { useModalContext } from '../context/ModalContext';
import { db } from '../service/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';

const Results = () => {
	const [empty, setEmpty] = useState(false);
	const [open, setOpen] = useState(false);
	const { documentObj, infoObj } = useModalContext();
	const [document, setDoc] = documentObj;
	const [info] = infoObj;

	const axios = rateLimit(Axios.create(), {
		maxRequests: 2,
		perMilliseconds: 1000,
		maxRPS: 2,
	});

	useEffect(
		() =>
			onSnapshot(doc(db, 'studentData', info.uid), (snapshot) => {
				if (snapshot.exists()) {
					setDoc(snapshot.data());
				} else {
					setEmpty(true);
				}
			}),

		[info.uid, setDoc]
	);

	const renderMember = (num, doc) => {
		const fields = [];
		for (var i = 1; i < num; i++) {
			fields.push(
				<Grid container item direction='row' key={i}>
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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		await axios.delete(
			process.env.REACT_APP_API_URL + '/deleteDoc/' + info.uid
		);

		setEmpty(true);
		setOpen(false);
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid item xs={12}>
						<Typography variant='h2' align='center' mb={4}>
							自主學習紀錄
						</Typography>
					</Grid>
					{empty === false ? (
						<Grid container direction='column' spacing={4}>
							<Grid container item direction='row'>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										班級座號
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										{document.class}
										{document.number < 10
											? '0' + document.number
											: document.number}
									</Typography>
								</Grid>
							</Grid>
							<Grid container item direction='row'>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										姓名
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										{document.name}
									</Typography>
								</Grid>
							</Grid>
							<Grid container item direction='row'>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										主題
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										{document.topicLabel}
									</Typography>
								</Grid>
							</Grid>
							<Grid container item direction='row'>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										副主題
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										{document.subTopicLabel}
									</Typography>
								</Grid>
							</Grid>
							{document.comment !== '' && (
								<Grid container item direction='row'>
									<Grid item xs={6}>
										<Typography variant='h5' align='center'>
											備註
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant='h5' align='center'>
											{document.comment}
										</Typography>
									</Grid>
								</Grid>
							)}
							<Grid container item direction='row'>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										組員人數
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='h5' align='center'>
										{document.memNum}
									</Typography>
								</Grid>
							</Grid>
							{renderMember(document.memNum, document)}
							{document.group !== '' && (
								<Grid container item direction='row'>
									<Grid item xs={6}>
										<Typography variant='h5' align='center'>
											組別
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant='h5' align='center'>
											{document.group}
										</Typography>
									</Grid>
								</Grid>
							)}
							<Grid
								container
								item
								direction='row'
								justifyContent='space-between'
							>
								<Grid item>
									<IconButton onClick={handleClickOpen}>
										<DeleteForever />
									</IconButton>
									<Dialog open={open} onClose={handleClose}>
										<DialogTitle>確定刪除?</DialogTitle>
										<DialogActions>
											<Button onClick={handleClose}>
												否
											</Button>
											<Button
												onClick={handleDelete}
												autoFocus
											>
												是
											</Button>
										</DialogActions>
									</Dialog>
								</Grid>
								<Grid item>
									<IconButton
										component={Link}
										to='/self-learning-edit'
									>
										<Edit />
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
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

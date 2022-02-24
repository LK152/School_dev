import {
	Grid,
	Container,
	Card,
	CardContent,
	List,
	ListItem,
	Button,
	ListItemText,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Divider,
	IconButton,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import useOption from '@src/context/OptionContext';
import { Add, Delete } from '@mui/icons-material';

const initStates = {
	classes: false,
	numbers: false,
	topics: false,
	subTopics: false,
};

const initTextStates = {
	classes: '',
	numbers: '',
	topics: '',
	subTopics: '',
};

const collapseInitStates = {};

const DataOptions = () => {
	const { classes, numbers, topics } = useOption();
	classes?.sort(function (a, b) {
		return a - b;
	});
	numbers?.sort(function (a, b) {
		return a - b;
	});
	classes?.forEach((Class) => {
		collapseInitStates[Class] = false;
	});
	const [dialogStates, setDialogStates] = useState(initStates);
	const [textStates, setTextStates] = useState(initTextStates);

	const handleDefault = (e) => {
		e.preventDefault();
	};

	const handleDialogOpen = (target) => {
		setDialogStates({ ...dialogStates, [target]: true });
	};

	const handleDialogClose = () => {
		setDialogStates(initStates);
	};

	const handleOptionsChange = async (e) => {
		handleDefault(e);
		textStates[e.target.id] !== '' &&
			(await axios.post(`/api/admin/options/${e.target.id}`, {
				value: textStates[e.target.id],
			}));

		setTextStates(initTextStates);
	};

	const handleOptionsDelete = async (type, id) => {
		await axios.delete(`/api/admin/options/${type}`, {
			data: { value: id },
		});
	};

	const handleTextChange = (e) => {
		setTextStates({ ...textStates, [e.target.name]: e.target.value });
	};

	const renderDialog = (type) => {
		const renderTitle = () => {
			switch (type) {
				case 'classes':
					return <DialogTitle>新增班級</DialogTitle>;

				case 'numbers':
					return <DialogTitle>新增座號</DialogTitle>;

				case 'topics':
					return <DialogTitle>新增主題</DialogTitle>;
				
				case 'subTopics': 
					return <DialogTitle>新增副組題</DialogTitle>

				case 'groups': 
					return <DialogTitle>新增組別</DialogTitle>
			}
		};

		return (
			<Dialog open={dialogStates[type]} onClose={handleDialogClose}>
				<form id={type} onSubmit={handleOptionsChange}>
					{renderTitle()}
					<DialogContent>
						<TextField
							name={type}
							value={textStates[type]}
							onChange={handleTextChange}
							variant='standard'
							autoComplete='off'
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose}>取消</Button>
						<Button
							id={type}
							disabled={textStates[type] === ''}
							onClick={handleOptionsChange}
						>
							新增
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	};

	return (
		<>
			<Container sx={{ my: 10 }}>
				<Grid container direction='column' gap={2}>
					<Grid item container direction='row' gap={2}>
						<Grid item xs>
							<Card>
								<CardContent>
									<List
										component='nav'
										sx={{ pb: 0, overflow: 'auto' }}
									>
										<ListItem
											secondaryAction={
												<Button
													onClick={() =>
														handleDialogOpen(
															'classes'
														)
													}
												>
													新增班級
												</Button>
											}
										>
											<ListItemText
												primary={
													<Typography>
														班級
													</Typography>
												}
											/>
										</ListItem>
										<Divider />
										{classes?.map((Class) => {
											return (
												<ListItem
													key={Class}
													secondaryAction={
														<IconButton
															onClick={() =>
																handleOptionsDelete(
																	'classes',
																	Class
																)
															}
														>
															<Delete />
														</IconButton>
													}
												>
													<ListItemText
														primary={
															<Typography>
																{Class}
															</Typography>
														}
													/>
												</ListItem>
											);
										})}
									</List>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs>
							<Card>
								<CardContent>
									<List
										component='nav'
										sx={{ pb: 0, overflow: 'auto' }}
									>
										<ListItem
											secondaryAction={
												<Button
													onClick={() =>
														handleDialogOpen(
															'numbers'
														)
													}
												>
													新增座號
												</Button>
											}
										>
											<ListItemText
												primary={
													<Typography>
														座號
													</Typography>
												}
											/>
										</ListItem>
										<Divider />
									</List>
									{numbers?.map((number) => {
										return (
											<ListItem
												key={number}
												secondaryAction={
													<IconButton
														onClick={() =>
															handleOptionsDelete(
																'numbers',
																number
															)
														}
													>
														<Delete />
													</IconButton>
												}
											>
												<ListItemText
													primary={
														<Typography>
															{number}
														</Typography>
													}
												/>
											</ListItem>
										);
									})}
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Grid item container direction='row'>
						<Grid item xs>
							<Card>
								<CardContent>
									<List
										component='nav'
										sx={{ pb: 0, overflow: 'auto' }}
									>
										<ListItem
											secondaryAction={
												<Button
													onClick={() =>
														handleDialogOpen(
															'topics'
														)
													}
												>
													新增主題
												</Button>
											}
										>
											<ListItemText
												primary={
													<Typography>
														主題
													</Typography>
												}
											/>
										</ListItem>
										<Divider />
										{topics?.map((topic) => {
											return (
												<ListItem
													key={topic}
													secondaryAction={
														<IconButton
															onClick={() =>
																handleOptionsDelete(
																	'topics',
																	topic
																)
															}
														>
															<Delete />
														</IconButton>
													}
												>
													<ListItemText
														primary={
															<Typography>
																{topic}
															</Typography>
														}
													/>
												</ListItem>
											);
										})}
									</List>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Grid item container direction='row'>
						<Grid item xs>
							<Card>
								<CardContent>
									<List
										component='nav'
										sx={{ pb: 0, overflow: 'auto' }}
									>
										<ListItem
											secondaryAction={
												<Button
													onClick={() =>
														handleDialogOpen(
															'groups'
														)
													}
												>
													新增組別
												</Button>
											}
										>
											<ListItemText
												primary={
													<Typography>
														組別
													</Typography>
												}
											/>
										</ListItem>
										<Divider />
									</List>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Container>
			{renderDialog('classes')}
			{renderDialog('numbers')}
			{renderDialog('topics')}
			{renderDialog('subTopics')}
			{renderDialog('groups')}
		</>
	);
};

export default DataOptions;

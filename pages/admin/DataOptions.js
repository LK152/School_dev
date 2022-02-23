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
	ListItemButton,
	Collapse,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import useOption from '@src/context/OptionContext';
import { Delete, ExpandLess, ExpandMore } from '@mui/icons-material';

const initStates = {
	classes: false,
	numbers: false,
};

const initTextStates = {
	classes: '',
	numbers: '',
};

const collapseInitStates = {};

const DataOptions = () => {
	const { classes, numbers } = useOption();
	classes?.forEach((Class) => {
		collapseInitStates[Class] = false;
	});
	const [dialogStates, setDialogStates] = useState(initStates);
	const [textStates, setTextStates] = useState(initTextStates);
	const [collapseStates, setCollapseStates] = useState(collapseInitStates);

	const handleDialogOpen = (e) => {
		setDialogStates({ ...dialogStates, [e.target.id]: true });
	};

	const handleDialogClose = () => {
		setDialogStates(initStates);
	};

	const handleOptionsChange = async (e) => {
		e.preventDefault();
		await axios.post(`/api/admin/options/${e.target.id}`, {
			value: textStates[e.target.id],
		});

		setTextStates(initTextStates);
	};

	const handleOptionsDelete = async (id, type) => {
		switch (type) {
			case 'classes':
				await axios.delete(`/api/admin/options/${type}`, {
					data: { value: id },
				});
				break;
		}
	};

	const handleTextChange = (e) => {
		setTextStates({ ...textStates, [e.target.name]: e.target.value });
	};

	const handleClick = (target) => {
		setCollapseStates({
			...collapseStates,
			[target]: !collapseStates[target],
		});
	};

	const renderDialog = (type) => {
		const renderTitle = () => {
			switch (type) {
				case 'classes':
					return <DialogTitle>新增班級</DialogTitle>;

				case 'numbers':
					return <DialogTitle>新增座號</DialogTitle>;
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
						<Button id={type} onClick={handleOptionsChange}>
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
				<Grid container>
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
												id='classes'
												onClick={handleDialogOpen}
											>
												新增班級
											</Button>
										}
									>
										<ListItemText
											primary={
												<Typography>班級</Typography>
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
														edge='end'
														onClick={() =>
															handleOptionsDelete(
																Class,
																'classes'
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
									<ListItem>
										<ListItemText
											primary={
												<Typography>座號</Typography>
											}
										/>
									</ListItem>
									<Divider />
									{classes?.map((Class) => {
										return (
											<>
												<ListItemButton
													key={Class}
													onClick={() =>
														handleClick(Class)
													}
												>
													<ListItemText
														primary={
															<Typography>
																{Class}
															</Typography>
														}
													/>
													{collapseStates[Class] ? (
														<ExpandLess />
													) : (
														<ExpandMore />
													)}
												</ListItemButton>
												<Collapse
													in={collapseStates[Class]}
													timeout='auto'
													unmountOnExit
												>
													<List component='div'>
														{numbers[Class] !==
														undefined ? (
															numbers[Class]?.map(
																(number) => {
																	return (
																		<ListItem
																			key={
																				number
																			}
																		>
																			<ListItemText
																				primary={
																					<Typography>
																						{
																							number
																						}
																					</Typography>
																				}
																			/>
																		</ListItem>
																	);
																}
															)
														) : (
															<ListItem>
																<ListItemText
																	primary={
																		<Typography>
																			無座號
																		</Typography>
																	}
																/>
															</ListItem>
														)}
													</List>
												</Collapse>
											</>
										);
									})}
								</List>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
			{renderDialog('classes')}
			{renderDialog('numbers')}
		</>
	);
};

export default DataOptions;

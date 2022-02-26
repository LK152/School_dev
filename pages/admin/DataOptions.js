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
	useMediaQuery,
	Collapse,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import useOption from '@src/context/OptionContext';
import { Add, Delete } from '@mui/icons-material';
import theme from '@styles/theme';

const initStates = {
	classes: false,
	numbers: false,
	topics: false,
	subTopics: false,
	groups: false,
};

const initTextStates = {
	classes: '',
	numbers: '',
	topics: '',
	subTopics: '',
	groups: '',
	location: '',
};

const collapseInitStates = {};

const DataOptions = () => {
	const { classes, numbers, topics, subTopics, groups } = useOption();
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
				[e.target.id]: textStates[e.target.id],
			}));

		setTextStates(initTextStates);
	};

	const handleOptionsDelete = async (type, id) => {
		await axios.delete(`/api/admin/options/${type}`, {
			data: { [type]: id },
		});
	};

	const handleGroupAdd = async (e) => {
		await axios.post(`/api/admin/options/${e.target.id}`, {
			location: textStates.location,
			group: textStates.groups,
		});

		setTextStates(initTextStates);
	};

	const handleGroupDelete = async (group, location) => {
		await axios.delete(`/api/admin/options/groups`, {
			data: {
				group,
				location,
			},
		});
	};

	const handleTextChange = (e) => {
		setTextStates({ ...textStates, [e.target.name]: e.target.value });
	};

	const renderDialog = (type) => {
		const renderTitle = () => {
			switch (type) {
				case 'classes':
					return '班級';

				case 'numbers':
					return '座號';

				case 'topics':
					return '主題';

				case 'subTopics':
					return '副組題';
			}
		};

		return (
			<Dialog open={dialogStates[type]} onClose={handleDialogClose}>
				<form id={type} onSubmit={handleOptionsChange}>
					<DialogTitle>新增{renderTitle()}</DialogTitle>
					<DialogContent>
						<TextField
							name={type}
							value={textStates[type]}
							onChange={handleTextChange}
							variant='standard'
							autoComplete='off'
							placeholder={renderTitle()}
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
					<Grid
						item
						container
						direction={
							useMediaQuery(theme.breakpoints.up('browser'))
								? 'row'
								: 'column'
						}
						gap={2}
					>
						<Grid item xs>
							<Card>
								<CardContent>
									<ListItem
										secondaryAction={
											<Button
												onClick={() =>
													handleDialogOpen('classes')
												}
											>
												新增班級
											</Button>
										}
									>
										<ListItemText
											primary={
												<Typography variant='h4'>
													班級
												</Typography>
											}
										/>
									</ListItem>
									<Divider />
									<List
										component='nav'
										sx={{
											pb: 0,
											overflow: 'auto',
											maxHeight: 400,
										}}
									>
										{classes?.length !== 0 ? (
											classes?.map((Class) => {
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
											})
										) : (
											<ListItem>
												<ListItemText
													primary={
														<Typography>
															無班級
														</Typography>
													}
												/>
											</ListItem>
										)}
									</List>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs>
							<Card>
								<CardContent>
									<ListItem
										secondaryAction={
											<Button
												onClick={() =>
													handleDialogOpen('numbers')
												}
											>
												新增座號
											</Button>
										}
									>
										<ListItemText
											primary={
												<Typography variant='h4'>
													座號
												</Typography>
											}
										/>
									</ListItem>
									<Divider />
									<List
										component='nav'
										sx={{
											pb: 0,
											overflow: 'auto',
											maxHeight: 400,
										}}
									>
										{numbers?.length !== 0 ? (
											numbers?.map((number) => {
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
											})
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
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Grid
						item
						container
						direction={
							useMediaQuery(theme.breakpoints.up('browser'))
								? 'row'
								: 'column'
						}
						gap={2}
					>
						<Grid item xs>
							<Card>
								<CardContent>
									<ListItem
										secondaryAction={
											<Button
												onClick={() =>
													handleDialogOpen('topics')
												}
											>
												新增主題
											</Button>
										}
									>
										<ListItemText
											primary={
												<Typography variant='h4'>
													主題
												</Typography>
											}
										/>
									</ListItem>
									<Divider />
									<List
										component='nav'
										sx={{
											pb: 0,
											overflow: 'auto',
											maxHeight: 400,
										}}
									>
										{topics?.length !== 0 ? (
											topics?.map((topic) => {
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
											})
										) : (
											<ListItem>
												<ListItemText
													primary={
														<Typography>
															無主題
														</Typography>
													}
												/>
											</ListItem>
										)}
									</List>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs>
							<Card>
								<CardContent>
									<ListItem
										secondaryAction={
											<Button
												onClick={() =>
													handleDialogOpen('topics')
												}
											>
												新增主題
											</Button>
										}
									>
										<ListItemText
											primary={
												<Typography variant='h4'>
													副主題
												</Typography>
											}
										/>
									</ListItem>
									<Divider />
									<List
										component='nav'
										sx={{
											pb: 0,
											overflow: 'auto',
											maxHeight: 400,
										}}
									>
										{topics?.length !== 0 ? (
											topics?.map((topic) => {
												return (
													<div key={topic}>
														<ListItem
															secondaryAction={
																<IconButton
																	onClick={() =>
																		handleOptionsDelete(
																			'topics',
																			topic
																		)
																	}
																>
																	<Add />
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
														<Collapse
															in
															timeout='auto'
															unmountOnExit
														>
															<List component='div'>
																{subTopics?.[
																	topic
																] !==
																undefined ? (
																	subTopics?.[
																		topic
																	].length !==
																		0 &&
																	subTopics?.[
																		topic
																	].map(
																		(
																			subTopic
																		) => {
																			return (
																				<ListItem
																					key={
																						subTopic
																					}
																				>
																					<ListItemText
																						primary={
																							<Typography>
																								{
																									subTopic
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
																					無副主題
																				</Typography>
																			}
																		/>
																	</ListItem>
																)}
															</List>
														</Collapse>
													</div>
												);
											})
										) : (
											<ListItem>
												<ListItemText
													primary={
														<Typography>
															無主題
														</Typography>
													}
												/>
											</ListItem>
										)}
									</List>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Grid item container direction='row'>
						<Grid item xs>
							<Card>
								<CardContent>
									<ListItem
										secondaryAction={
											<Button
												onClick={() =>
													handleDialogOpen('groups')
												}
											>
												新增組別
											</Button>
										}
									>
										<ListItemText
											primary={
												<Typography variant='h4'>
													組別/地點
												</Typography>
											}
										/>
									</ListItem>
									<Divider />
									<List
										component='nav'
										sx={{
											pb: 0,
											overflow: 'auto',
											maxHeight: 400,
										}}
									>
										{groups?.length !== 0 ? (
											groups?.map((group) => {
												return (
													<ListItem
														key={group.group}
														secondaryAction={
															<IconButton
																onClick={() =>
																	handleGroupDelete(
																		group.group,
																		group.location
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
																	{
																		group.group
																	}
																	&emsp;/&emsp;
																	{
																		group.location
																	}
																</Typography>
															}
														/>
													</ListItem>
												);
											})
										) : (
											<ListItem>
												<ListItemText
													primary={
														<Typography>
															無組別
														</Typography>
													}
												/>
											</ListItem>
										)}
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
			<Dialog open={dialogStates.subTopics} onClose={handleDialogClose}>
				<DialogTitle>新增組別</DialogTitle>
				<DialogContent>
					<TextField
						name='subTopics'
						value={textStates.subTopics}
						onChange={handleTextChange}
						variant='standard'
						autoComplete='off'
						placeholder='副主題'
						sx={{ mr: 1 }}
					/>
					<TextField
						name='location'
						value={textStates.location}
						onChange={handleTextChange}
						variant='standard'
						autoComplete='off'
						placeholder='地點'
						sx={{ ml: 1 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>取消</Button>
					<Button
						id='subTopics'
						disabled={
							textStates.groups === '' ||
							textStates.location === ''
						}
						onClick={handleGroupAdd}
					>
						新增
					</Button>
				</DialogActions>
			</Dialog>
			{console.log(subTopics)}
			<Dialog open={dialogStates.groups} onClose={handleDialogClose}>
				<DialogTitle>新增組別</DialogTitle>
				<DialogContent>
					<TextField
						name='groups'
						value={textStates.groups}
						onChange={handleTextChange}
						variant='standard'
						autoComplete='off'
						placeholder='組別'
						sx={{ mr: 1 }}
					/>
					<TextField
						name='location'
						value={textStates.location}
						onChange={handleTextChange}
						variant='standard'
						autoComplete='off'
						placeholder='地點'
						sx={{ ml: 1 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>取消</Button>
					<Button
						id='groups'
						disabled={
							textStates.groups === '' ||
							textStates.location === ''
						}
						onClick={handleGroupAdd}
					>
						新增
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DataOptions;

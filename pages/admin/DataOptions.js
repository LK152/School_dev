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
	Divider,
	IconButton,
	useMediaQuery,
	Collapse,
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useOption from '@src/context/OptionContext';
import { Delete } from '@mui/icons-material';
import theme from '@styles/theme';
import { withAdmin } from '@src/hook/route';
import RenderDialog from '@components/RenderDialog';
import RenderCard from '@components/RenderCard';

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
const collapseTrueStates = {};

const DataOptions = () => {
	const { classes, numbers, topics, subTopics, groups } = useOption();
	classes?.sort(function (a, b) {
		return a - b;
	});
	numbers?.sort(function (a, b) {
		return a - b;
	});
	topics?.forEach((topic) => {
		collapseInitStates[topic] = false;
		collapseTrueStates[topic] = true;
	});
	const [dialogStates, setDialogStates] = useState(initStates);
	const [textStates, setTextStates] = useState(initTextStates);
	const [collapseStates, setCollapseStates] = useState(collapseInitStates);
	const [collapseAllState, setCollpaseAllState] = useState(false);
	const [subTopicTarget, setSubTopicTarget] = useState('');

	useEffect(() => {
		for (const keys in collapseStates) {
			if (collapseStates[keys]) {
				setCollpaseAllState(true);
				break;
			} else {
				setCollpaseAllState(false);
			}
		}
	}, [collapseStates]);

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

	const handleGroupAdd = async () => {
		await axios.post(`/api/admin/options/groups`, {
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

	const handleCollapse = (target) => {
		setCollapseStates({
			...collapseStates,
			[target]: !collapseStates[target],
		});
	};

	const handleCollapseAll = () => {
		setCollapseStates(
			collapseAllState ? collapseInitStates : collapseTrueStates
		);
		setCollpaseAllState(!collapseAllState);
	};

	const handleSubTopicDialogOpen = (target) => {
		setDialogStates({ ...dialogStates, subTopics: true });
		setSubTopicTarget(target);
	};

	const handleSubTopicAdd = async (e) => {
		handleDefault(e);
		textStates.subTopics !== '' &&
			(await axios.post(`/api/admin/options/subTopics`, {
				topics: subTopicTarget,
				subTopics: textStates.subTopics,
			}));

		setTextStates(initTextStates);
	};

	const handleSubTopicDelete = async (topic, subTopic) => {
		await axios.delete(`/api/admin/options/subTopics`, {
			data: {
				topics: topic,
				subTopics: subTopic,
			},
		});
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
							<RenderCard
								type='classes'
								title='班級'
								handleDialogOpen={handleDialogOpen}
								handleDelete={handleOptionsDelete}
								listItems={classes}
							/>
						</Grid>
						<Grid item xs>
							<RenderCard
								type='numbers'
								title='座號'
								handleDialogOpen={handleDialogOpen}
								handleDelete={handleOptionsDelete}
								listItems={numbers}
							/>
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
							<RenderCard
								type='topics'
								title='主題'
								handleDialogOpen={handleDialogOpen}
								handleDelete={handleOptionsDelete}
								listItems={topics}
							/>
						</Grid>
						<Grid item xs>
							<RenderCard
								type='subTopics'
								handleSubTopicDialogOpen={
									handleSubTopicDialogOpen
								}
								collapseAllState={collapseAllState}
								handleCollapse={handleCollapse}
								collapseStates={collapseStates}
								handleCollapseAll={handleCollapseAll}
								handleSubTopicDelete={handleSubTopicDelete}
								topics={topics}
								subTopics={subTopics}
							/>
						</Grid>
					</Grid>
					<Grid item container direction='row'>
						<Grid item xs>
							<Card raised>
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
											maxHeight: 300,
										}}
									>
										{groups && groups?.length !== 0 ? (
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
			<RenderDialog
				type='classes'
				open={dialogStates.classes}
				onClose={handleDialogClose}
				inputValue={textStates.classes}
				inputChange={handleTextChange}
				handleSubmit={handleOptionsChange}
			/>
			<RenderDialog
				type='numbers'
				open={dialogStates.numbers}
				onClose={handleDialogClose}
				inputValue={textStates.numbers}
				inputChange={handleTextChange}
				handleSubmit={handleOptionsChange}
			/>
			<RenderDialog
				type='topics'
				open={dialogStates.topics}
				onClose={handleDialogClose}
				inputValue={textStates.topics}
				inputChange={handleTextChange}
				handleSubmit={handleOptionsChange}
			/>
			<RenderDialog
				type='subTopics'
				open={dialogStates.subTopics}
				onClose={handleDialogClose}
				inputValue={textStates.subTopics}
				inputChange={handleTextChange}
				handleSubmit={handleOptionsChange}
				setTarget={setSubTopicTarget}
				handleSubTopicAdd={handleSubTopicAdd}
			/>
			<RenderDialog
				type='groups'
				open={dialogStates.groups}
				onClose={handleDialogClose}
				inputValue={textStates}
				inputChange={handleTextChange}
				handleGroupAdd={handleGroupAdd}
			/>
		</>
	);
};

export default withAdmin(DataOptions);

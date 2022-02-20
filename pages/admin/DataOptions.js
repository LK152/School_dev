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
import { Delete } from '@mui/icons-material';

const initStates = {
	classDialog: false,
	numberDialog: false,
	topicDialog: false,
	subTopicDialog: false,
	groupDialog: false,
};

const DataOptions = () => {
	const { classes } = useOption();
	const [dialogStates, setDialogStates] = useState(initStates);
	const [textField, setTextField] = useState('');
	const { classDialog, numberDialog } = dialogStates;

	const handleDialogOpen = (e) => {
		setDialogStates({ ...dialogStates, [e.target.id]: true });
	};

	const handleDialogClose = () => {
		setDialogStates(initStates);
	};

	const handleOptionsChange = async (e) => {
		e.preventDefault();
		await axios.post(`/api/admin/options/${e.target.id}`, {
			value: textField,
		});

		setTextField('');
	};

	const handleTextChange = (e) => {
		setTextField(e.target.value);
	};

	return (
		<>
			<Container sx={{ my: 10 }}>
				<Grid container>
					<Grid item xs>
						<Card>
							<CardContent>
								<List component='nav' sx={{ pb: 0 }}>
									<ListItem
										secondaryAction={
											<Button
												id='classDialog'
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
											<ListItem key={Class}>
												<ListItemText
													primary={
														<Typography>
															{Class}
														</Typography>
													}
												/>
												<IconButton>
													<Delete />
												</IconButton>
											</ListItem>
										);
									})}
								</List>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs>
						<Card>
							<CardContent></CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
			<Dialog open={classDialog} onClose={handleDialogClose}>
				<form id='classes' onSubmit={handleOptionsChange}>
					<DialogTitle>新增班級</DialogTitle>
					<DialogContent>
						<TextField
							value={textField}
							onChange={handleTextChange}
							variant='standard'
							autoComplete='off'
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose}>取消</Button>
						<Button id='classes' onClick={handleOptionsChange}>
							新增
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default DataOptions;

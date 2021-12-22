import { useState } from 'react';
import {
	Box,
	Button,
	Card,
	Container,
	CardContent,
	Grid,
	TextField,
	InputLabel,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	FormControl,
	styled,
	IconButton,
	Typography,
} from '@mui/material';
import { Send, DeleteOutline } from '@mui/icons-material';
import { mainTopics, subTopics, classes, numbers } from './Options';
import Select from './Select';
import { db } from '../config/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

const initialValues = {
	class: '',
	number: '',
	mainTopic: '',
	subTopic: '',
	otherTopic: '',
	isSent: false,
	memNum: '1',
	mem1Class: '',
	mem1Num: '',
	mem2Class: '',
	mem2Num: '',
};

const Collection = collection(db, 'studentData');

const Submitbtn = styled(Button)({
	border: '1px solid rgb(25, 118, 210)',
	boxSizing: 'border-box',
	transition: '.5s ease-in-out',
	overflow: 'hidden',
	'&:before': {
		content: '""',
		borderRight: '50px solid transparent',
		borderTop: '36px solid rgb(25, 118, 210)',
		transform: 'translateX(-100%)',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: -50,
		left: 0,
		transition: '.5s ease-in-out',
	},
	'&:hover': {
		color: '#FFF',
		'&:before': {
			transform: 'translateX(0)',
			transition: '.5s ease-in-out',
		},
	},
});

const Form = () => {
	const [values, setValues] = useState(initialValues);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const createData = async () => {
		const data = {
			class: values.class,
			number: values.number,
			topic: mainTopics[values.mainTopic].label,
			subTopic:
				values.mainTopic !== 7
					? subTopics[values.mainTopic][values.subTopic].label
					: values.otherTopic,
			members: values.memNum,
			mem1Class: values.mem1Class,
			mem1Num: values.mem1Num,
			mem2Class: values.mem2Class,
			mem2Num: values.mem2Num,
		};

		await addDoc(Collection, data);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createData();
		setValues({ ...values, isSent: true });
	};

	const handleDelete = () => {
		setValues(initialValues);
	};

	const validateNum = () => {
		if (
			values.mem1Class === values.class &&
			values.mem1Num === values.number &&
			values.mem1Class !== '' &&
			values.mem1Num !== ''
		) {
			return true;
		}
		if (
			values.mem2Class === values.class &&
			values.mem2Num === values.number &&
			values.mem2Class !== '' &&
			values.mem2Num !== ''
		) {
			return true;
		}
	};

	const renderMemberSelect = (num) => {
		let fields = [];
		for (var i = 1; i < num; i++) {
			fields.push(
				<>
					<Box width={550}>
						<FormControl fullWidth>
							<InputLabel>{'組員' + i + '班級'}</InputLabel>
							<Select
								label={'組員' + i + '班級'}
								name={'mem' + i + 'Class'}
								options={classes}
								value={
									i === 1
										? values.mem1Class
										: values.mem2Class
								}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>
					<Box width={550}>
						<FormControl fullWidth>
							<InputLabel>{'組員' + i + '座號'}</InputLabel>
							<Select
								label={'組員' + i + '座號'}
								name={'mem' + i + 'Num'}
								options={numbers}
								value={
									i === 1 ? values.mem1Num : values.mem2Num
								}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>
				</>
			);
		}

		return (
			<Box
				sx={{
					my: { xs: 3 },
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				{fields}
			</Box>
		);
	};

	const handleValidation = () => {
		if (values.class === '' || values.number === '') {
			return true;
		}
		if (values.memNum === '') {
			return true;
		} else if (
			values.memNum === 2 &&
			(values.mem1Class === '' || values.mem1Num === '')
		) {
			return true;
		}
		if (values.mainTopic === '') {
			return true;
		} else if (values.mainTopic !== 7) {
			if (values.subTopic === '') {
				return true;
			}
		} else {
			if (values.otherTopic === '') {
				return true;
			} else {
				return false;
			}
		}
	};

	switch (values.isSent) {
		case true:
			return (
				<Typography variant='h1' align='center'>
					已送出
				</Typography>
			);

		default:
			return (
				<Container sx={{ mt: 10 }}>
					<Card raised>
						<CardContent>
							<Grid
								container
								rowGap={8}
								display='flex'
								flexDirection='column'
							>
								<Grid item xs={12}>
									<Typography
										variant='h2'
										align='center'
										sx={{ mt: { xs: 6 } }}
									>
										麗山高中
									</Typography>
								</Grid>
								<form onSubmit={handleSubmit}>
									<Box
										sx={{
											my: { xs: 3 },
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-evenly',
										}}
									>
										<Box width={550}>
											<FormControl fullWidth>
												<InputLabel>班級 *</InputLabel>
												<Select
													label='班級 *'
													name='class'
													options={classes}
													value={values.class}
													onChange={handleChange}
												/>
											</FormControl>
										</Box>
										<Box width={550}>
											<FormControl fullWidth>
												<InputLabel>座號 *</InputLabel>
												<Select
													label='座號 *'
													name='number'
													options={numbers}
													value={values.number}
													onChange={handleChange}
												/>
											</FormControl>
										</Box>
									</Box>
									<Box sx={{ my: { xs: 3 } }}>
										<FormControl fullWidth>
											<InputLabel>主題 *</InputLabel>
											<Select
												label='主題 *'
												name='mainTopic'
												options={mainTopics}
												value={values.mainTopic}
												onChange={handleChange}
											/>
										</FormControl>
									</Box>
									{values.mainTopic !== '' &&
										values.mainTopic !== 7 && (
											<Box sx={{ my: { xs: 3 } }}>
												<FormControl fullWidth>
													<InputLabel>
														副主題 *
													</InputLabel>
													<Select
														label='副主題 *'
														name='subTopic'
														options={
															subTopics[
																values.mainTopic
															]
														}
														value={values.subTopic}
														onChange={handleChange}
													/>
												</FormControl>
											</Box>
										)}
									{values.mainTopic === 7 && (
										<Box sx={{ my: { xs: 3 } }}>
											<FormControl fullWidth>
												<TextField
													variant='filled'
													label='其他'
													name='otherTopic'
													value={values.otherTopic}
													onChange={handleChange}
													autoComplete='off'
												/>
											</FormControl>
										</Box>
									)}
									{(values.subTopic !== '' ||
										values.otherTopic !== '') && (
										<Box sx={{ my: { xs: 3 } }}>
											<FormControl component='fieldset'>
												<FormLabel>小組人數</FormLabel>
												<RadioGroup
													row
													name='memNum'
													value={values.memNum}
													onChange={handleChange}
												>
													<FormControlLabel
														value='1'
														control={<Radio />}
														label='1'
													/>
													<FormControlLabel
														value='2'
														control={<Radio />}
														label='2'
													/>
													<FormControlLabel
														value='3'
														control={<Radio />}
														label='3'
													/>
												</RadioGroup>
											</FormControl>
										</Box>
									)}
									{values.memNum >= 2 &&
										renderMemberSelect(values.memNum)}
									<IconButton onClick={handleDelete}>
										<DeleteOutline />
									</IconButton>
									<Submitbtn
										type='submit'
										disableRipple
										disabled={
											handleValidation() || validateNum()
										}
										sx={{ float: 'right' }}
									>
										<div
											className='submitBtn'
											id='submitBtn'
										>
											送出
											<Send id='sendIcon' />
										</div>
									</Submitbtn>
								</form>
							</Grid>
						</CardContent>
					</Card>
				</Container>
			);
	}
};

export default Form;

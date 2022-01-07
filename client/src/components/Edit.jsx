import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
	Typography,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { mainTopics, subTopics, classes, numbers } from './Options';
import Select from './Select';
import EditDoc from '../api/EditDoc';
import { ModalContext } from '../context/ModalContext';
import '../App.css';

const Submitbtn = styled(Button)({
	border: '2px solid #F3905F',
	borderRadius: '5%',
	boxSizing: 'border-box',
	transition: '.5s ease-in-out',
	overflow: 'hidden',
	'&:before': {
		content: '""',
		borderRight: '50px solid transparent',
		borderTop: '40px solid #F3905F',
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
	const { documentObj, infoObj } = useContext(ModalContext);
	const [values, setValues] = documentObj;
	const [info] = infoObj;

	const navigate = useNavigate();

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		navigate('/self-learning-results');
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		EditDoc(info.uid, values);
		navigate('/self-learning-results');
	};

	const renderMemberSelect = (num) => {
		let fields = [];
		for (var i = 1; i < num; i++) {
			fields.push(
				<Grid container key={i} spacing={1}>
					<Grid item xs>
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
					</Grid>
					<Grid item xs>
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
					</Grid>
				</Grid>
			);
		}

		return (
			<Grid container direction='column' rowGap={1}>
				{fields}
			</Grid>
		);
	};

	const handleValidation = () => {
		if (values.class === '' || values.number === '') {
			return true;
		}
		if (
			values.memNum === '2' &&
			(values.mem1Class === '' || values.mem1Num === '')
		) {
			return true;
		} else if (
			values.memNum === '3' &&
			(values.mem1Class === '' ||
				values.mem1Num === '' ||
				values.mem2Class === '' ||
				values.mem2Num === '' ||
				(values.mem1Class === values.mem2Class &&
					values.mem1Num === values.mem2Num))
		) {
			return true;
		}
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

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' rowGap={6}>
						<Grid item>
							<Typography variant='h2' align='center'>
								麗山高中自主學習表單
							</Typography>
						</Grid>
						<form onSubmit={handleSubmit}>
							<Grid container direction='column' rowSpacing={1}>
								<Grid container direction='row' spacing={1}>
									<Grid item xs={6}>
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
									</Grid>
									<Grid item xs={6}>
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
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth>
										<InputLabel>主題 *</InputLabel>
										<Select
											label='主題 *'
											name='topic'
											options={mainTopics}
											value={values.topic}
											onChange={handleChange}
										/>
									</FormControl>
								</Grid>
								{values.mainTopic !== '' &&
									values.mainTopic !== 7 && (
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel>
													副主題 *
												</InputLabel>
												<Select
													label='副主題 *'
													name='subTopic'
													options={
														subTopics[
															values.topic
														]
													}
													value={values.subTopic}
													onChange={handleChange}
												/>
											</FormControl>
										</Grid>
									)}
								{values.mainTopic === 7 && (
									<Grid item xs={12}>
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
									</Grid>
								)}
								{(values.subTopic !== '' ||
									values.otherTopic !== '') && (
									<Grid item xs={12}>
										<FormControl component='fieldset'>
											<FormLabel component='legend'>
												組員人數
											</FormLabel>
											<RadioGroup
												row
												name='memNum'
												value={values.memNum}
												onChange={handleChange}
											>
												<FormControlLabel
													value={1}
													control={<Radio />}
													label='1'
												/>
												<FormControlLabel
													value={2}
													control={<Radio />}
													label='2'
												/>
												<FormControlLabel
													value={3}
													control={<Radio />}
													label='3'
												/>
											</RadioGroup>
										</FormControl>
									</Grid>
								)}
								{values.memNum >= 2 &&
									renderMemberSelect(values.memNum)}
								<Grid
									container
									item
									direction='row'
									justifyContent='space-between'
								>
									<Button onClick={handleCancel}>
										<Typography
											sx={{
												display: 'flex',
												flexDirection: 'row',
												zIndex: 1,
											}}
										>
											取消
											<Cancel />
										</Typography>
									</Button>
									<Submitbtn
										type='submit'
										disableRipple
										disabled={handleValidation()}
									>
										<Typography
											sx={{
												display: 'flex',
												flexDirection: 'row',
												zIndex: 1,
											}}
										>
											更改
											<Save />
										</Typography>
									</Submitbtn>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Form;

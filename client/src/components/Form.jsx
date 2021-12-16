import { useState } from 'react';
import {
	Box,
	Button,
	TextField,
	InputLabel,
	FormControl,
	styled,
	IconButton,
	Typography,
} from '@mui/material';
import { Send, DeleteOutline } from '@mui/icons-material';
import { mainTopics, subTopics, members, classes, numbers } from './Options';
import Select from './Select';
import createData from '../api/createData';
import '../App.css';

const initialValues = {
	class: '',
	number: '',
	mainTopic: '',
	subTopic: '',
	otherTopic: '',
	isSent: false,
	memNum: '',
	mem1Class: '',
	mem1Num: '',
	mem2Class: '',
	mem2Num: '',
};

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

	const handleTextChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSelect = (name, value) => {
		setValues({ ...values, [name]: value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		createData([
			values.studentId,
			mainTopics[values.mainTopic].label,
			subTopics[values.mainTopic][values.subTopic].label,
			values.members,
		]);
		setValues({ ...values, isSent: true });
	};

	const handleDelete = () => {
		setValues(initialValues);
	};

	const validateNum = () => {
		if (values.mem1Class === values.class && values.mem1Num === values.number) {
			return true;
		}
		if (values.mem2Class === values.class && values.mem2Num === values.number) {
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
								onChange={handleSelect}
							/>
						</FormControl>
					</Box>
					<Box width={550}>
						<FormControl fullWidth error={validateNum()}>
							<InputLabel>{'組員' + i + '座號'}</InputLabel>
							<Select
								label={'組員' + i + '座號'}
								name={'mem' + i + 'Num'}
								options={numbers}
								value={
									i === 1
										? values.mem1Num
										: values.mem2Num
								}
								onChange={handleSelect}
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
									onChange={handleSelect}
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
									onChange={handleSelect}
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
								onChange={handleSelect}
							/>
						</FormControl>
					</Box>
					{values.mainTopic !== '' && values.mainTopic !== 7 && (
						<Box sx={{ my: { xs: 3 } }}>
							<FormControl fullWidth>
								<InputLabel>副主題 *</InputLabel>
								<Select
									label='副主題 *'
									name='subTopic'
									options={subTopics[values.mainTopic]}
									value={values.subTopic}
									onChange={handleSelect}
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
									onChange={handleTextChange}
								/>
							</FormControl>
						</Box>
					)}
					{(values.subTopic !== '' || values.otherTopic !== '') && (
						<Box sx={{ my: { xs: 3 } }}>
							<FormControl fullWidth>
								<InputLabel>組員人數</InputLabel>
								<Select
									label='組員人數'
									name='memNum'
									options={members}
									value={values.memNum}
									onChange={handleSelect}
								/>
							</FormControl>
						</Box>
					)}
					{values.memNum >= 2 && renderMemberSelect(values.memNum)}
					<IconButton onClick={handleDelete}>
						<DeleteOutline />
					</IconButton>
					<Submitbtn
						type='submit'
						disableRipple
						disabled={handleValidation()}
						sx={{ float: 'right' }}
					>
						<div className='submitBtn' id='submitBtn'>
							送出
							<Send id='sendIcon' />
						</div>
					</Submitbtn>
				</form>
			);
	}
};

export default Form;

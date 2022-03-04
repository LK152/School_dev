import {
	Grid,
	Container,
	Card,
	CardContent,
	Typography,
	Button,
	TextField,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import useAuth from '@src/context/AuthContext';
import { useState } from 'react';
import moment from 'moment';
import { getDatabase, ref, set } from 'firebase/database';

const SetDate = () => {
	const { deadline } = useAuth();
	const [newDeadline, setNewDeadline] = useState(deadline);

	const handleDeadline = (value) => {
		setNewDeadline(moment(value).format('YYYY-MM-DD HH:mm'));
	};

	const handleSubmit = async () => {
		const rtdb = getDatabase();

		await set(ref(rtdb, 'data'), { deadline: newDeadline });

		setNewDeadline(deadline);
	};

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
						<Grid item>
							<Typography
								variant='h4'
								align='center'
								sx={{ mt: { xs: 6 } }}
							>
								繳交期限
							</Typography>
						</Grid>
						<Grid item m='auto'>
							<form onSubmit={handleSubmit}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<LocalizationProvider
										dateAdapter={DateAdapter}
									>
										<DateTimePicker
											value={newDeadline}
											onChange={handleDeadline}
											renderInput={(params) => (
												<TextField {...params} />
											)}
										/>
									</LocalizationProvider>
									<Button onClick={handleSubmit}>確認</Button>
								</div>
							</form>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default SetDate;

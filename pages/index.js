import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import useAuth from '@src/context/AuthContext';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect } from 'react';

const Home = () => {
	const { deadline, setDeadline } = useAuth();
	const rtdb = getDatabase();
	const deadlineRef = ref(rtdb, 'data/deadline');

	useEffect(() => {
		onValue(deadlineRef, (snapshot) => {
			setDeadline(snapshot.val());
		});
	}, [setDeadline, deadlineRef]);

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
								麗山高中自主學習
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								variant='h4'
								align='center'
								sx={{ fontWeight: 'bold' }}
							>
								{`繳交期限: ${deadline}`}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Home;

import { Container, Card, CardContent, Typography } from '@mui/material';

const OverDue = () => {
	return (
		<Container sx={{ mt: 10 }}>
			<Card raised>
				<CardContent>
					<Typography variant='h2' align='center'>
						自主學習表單已截止
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};

export default OverDue;

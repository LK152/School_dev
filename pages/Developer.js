import { Container, Card, CardContent, Typography, Grid } from '@mui/material';

const Developer = () => {
	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' spacing={4}>
						<Grid item>
							<Typography variant='h2' align='center'>
								開發者團隊
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h5' align='center'>
								策劃者:&ensp;金佳龍
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h5' align='center'>
								前端/後端/視覺設計:&ensp;21屆吳俊霆
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h5' align='center'>
								後端:&ensp;21屆張新約
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h5' align='center'>
								視覺設計:&ensp;21屆高正
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Developer;
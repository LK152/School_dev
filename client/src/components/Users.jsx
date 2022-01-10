import { Container, Card, CardContent, Grid, Typography } from '@mui/material';
import UsersTable from './UsersTable';

const Users = () => {
	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column'>
						<Grid item>
							<Typography variant='h2' textAlign='center'>
								用戶
							</Typography>
						</Grid>
                        <Grid item>
                            <UsersTable />
                        </Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Users;

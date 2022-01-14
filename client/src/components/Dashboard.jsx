import { Container, Card, CardContent, Grid, Typography } from '@mui/material';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
    return (
        <Container sx={{ my: 10 }}>
            <Card raised>
                <CardContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant='h3' textAlign='center'>
                                學生紀錄
                            </Typography>
                        </Grid>
                        <Grid item>
                            <StudentDashboard />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Dashboard;

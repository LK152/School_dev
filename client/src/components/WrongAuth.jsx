import { Box, Container, Typography, Card, CardContent } from '@mui/material';

const WrongAuth = () => {
    return (
        <Container>
            <Box>
                <Card raised sx={{ my: { md: 12 }, p: { md: 6 } }}>
                    <CardContent>
                        <Typography variant="h1" align="center">
                            請登入學校帳號
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default WrongAuth;
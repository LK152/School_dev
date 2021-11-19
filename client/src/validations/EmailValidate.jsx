import { Box, Container, Paper, Typography } from '@mui/material';

const EmailValidate = (props) => {
    return (
        <Container>
            <Box>
                <Paper variant="outlined">
                    <Typography variant="h1">
                        不是麗山學號
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}

export default EmailValidate;
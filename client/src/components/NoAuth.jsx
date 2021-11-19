import { Component } from 'react';
import { Box, Paper, Container, Typography } from '@mui/material';

export default class NoAuth extends Component {
    render() {
        return (
            <Container>
                <Box>
                    <Paper variant="outlined" sx={{ my: { md: 12 }, p: { md: 6 } }}>
                        <Typography variant="h1" align="center">
                            請登入
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        );
    }
}
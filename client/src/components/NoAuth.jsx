import { Component } from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';

export default class NoAuth extends Component {
    render() {
        return (
            <Container>
                <Box>
                    <Card raised sx={{ my: { md: 12 }, p: { md: 6 } }}>
                        <CardContent>
                            <Typography variant="h1" align="center">
                                請登入
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        );
    }
}
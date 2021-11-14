import '../css/App.css';
import { useState, Fragment } from 'react';
import { AppBar, Container, Stepper, Paper, Typography } from '@mui/material';
import Login from './Login';

const Form = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Fragment>
            <AppBar 
                position="absolute" 
                color="default" 
                elevation={0} 
                sx={{
                    position: 'relative', 
                    borderBottom: (target) => `1px solid ${target.palette.divider}`
                }}
            >
                <Container className="login-container">
                    Lishan
                    <Login />
                </Container>
            </AppBar>

                <Container component="main">
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" varient="h4" align="center">
                        Lishan Survey    
                    </Typography>
                    </Paper>
                </Container>
        </Fragment>
    )
}

export default Form;
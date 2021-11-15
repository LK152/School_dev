import '../css/App.css';
import { useState, Fragment } from 'react';
import { AppBar, Box, Button, Container, Step, Stepper, StepLabel, Paper, Typography} from '@mui/material';
import Login from './Login';
import StudentIDForm from './StudentIDForm';
import TopicForm from './TopicForm';

const steps = ['學號', '主題'];

const Submit = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStep = (currentStep) => {
        switch(currentStep) {
            case 0: 
                return <StudentIDForm />;
            
            case 1: 
                return <TopicForm />;

            default: 
                return "無此步驟";
        }
    }

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
                    麗山高中
                    <Login />
                </Container>
            </AppBar>

                <Container component="main">
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" varient="h4" align="center">
                        麗山高中 自主學習
                    </Typography>
                    <Stepper activeStep={currentStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {currentStep === steps.length ? (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                已送出
                            </Typography>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>步驟 {currentStep + 1}</Typography>
                            {renderStep(currentStep)}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button 
                                    color="inherit" 
                                    disabled={currentStep === 0} 
                                    onClick={handleBack} 
                                    sx={{ mr: 1 }}
                                >
                                    返回
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {currentStep === steps.length - 1 ? '繳交' : '下一步'}
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                    </Paper>
                </Container>
        </Fragment>
    )
}

export default Submit;
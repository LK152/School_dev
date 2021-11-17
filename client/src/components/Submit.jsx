import '../css/App.css';
import { useState } from 'react';
import { AppBar, Box, Button, Container, Step, Stepper, StepLabel, Paper, Typography} from '@mui/material';
import StudentIDForm from './StudentIDForm';
import TopicForm from './TopicForm';
import Login from './Login';
import Confirm from './Confirm';

const steps = ['學號', '主題', '確認'];

const topics = [
    {label: '延伸與預修課程', value: 1}, 
    {label: '課外閱讀', value: 2}, 
    {label: '線上學習課程', value: 3},  
    {label: '能力檢定', value: 4}, 
    {label: '服務學習課程',  value: 5}, 
    {label: '培訓課程', value: 6}, 
    {label: '專題研究', value: 7}, 
    {label: '其他', value: 8}
];

const subTopics = [[], 
    [ 
        {label: '延伸中文', value: 1}, 
        {label: '延伸英文', value: 2}, 
        {label: '延伸自然', value: 3}, 
        {label: '延伸社會', value: 4}, 
        {label: '延伸數學', value: 5}, 
        {label: '延伸藝能', value: 6}
    ], 
    [ 
        {label: '課外中文', value: 1}, 
        {label: '課外英文', value: 2}, 
        {label: '課外數學', value: 3}, 
        {label: '課外自然', value: 4}, 
        {label: '課外社會', value: 5}, 
        {label: '課外藝能', value: 6}
    ], 
    [
        {label: '線上大學平台課程', value: 1}, 
        {label: '線上語文', value: 2}, 
        {label: '線上數學', value: 3}, 
        {label: '線上自然', value: 4}, 
        {label: '線上社會', value: 5}, 
        {label: '線上藝能台英聯盟', value: 6}
    ], 
    [
        {label: '能力檢定-資訊', value: 1}, 
        {label: '能力檢定-英文', value: 2}, 
        {label: '能力檢定-其他', value: 3}
    ], 
    [
        {label: '服務星嵐', value: 1}, 
        {label: '服務星晞', value: 2}, 
        {label: '服務公民科學家', value: 3}
    ], 
    [
        {label: '選手培訓', value: 1}, 
        {label: '其他', value: 2}
    ], 
    [
        {label: '國文', value: 1}, 
        {label: '英文', value: 2}, 
        {label: '數學', value: 3}, 
        {label: '物理', value: 4}, 
        {label: '化學', value: 5}, 
        {label: '生物', value: 6}, 
        {label: '地科', value: 7}, 
        {label: '資訊', value: 8}, 
        {label: '生科', value: 9}, 
        {label: '歷史', value: 10}, 
        {label: '地理', value: 11}, 
        {label: '公民', value: 12}, 
        {label: '其他', value: 13}
    ]
];

const Submit = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [studentId, setStudentId] = useState('');
    const [topicValue, setTopicValue] = useState('');
    const [subTopicValue, setSubTopicValue] = useState('');
    const [otherTopicValue, setOtherTopicValue] = useState('');

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const setStudentForm = (e) => {
        setStudentId(e.target.value);
        console.log(e.target.value);
    };

    const handleTopicChange = (value) => {
        setTopicValue(value);
    };

    const handleSubTopicChange = (value) => {
        setSubTopicValue(value);
    };

    const handleOtherTopicChange = (e) => {
        setOtherTopicValue(e.target.value);
    };

    const studentProps = { studentId, setStudentForm };
    const topicProps = { topics, topicValue, subTopics, subTopicValue, otherTopicValue, handleTopicChange, handleSubTopicChange, handleOtherTopicChange };
    const confirmProps = { studentId, topics, topicValue };

    const renderStep = (currentStep) => {
        switch(currentStep) {
            case 0: 
                return <StudentIDForm {...studentProps} />;
            
            case 1: 
                return <TopicForm {...topicProps} />;

            case 2: 
                return <Confirm {...confirmProps} />

            default: 
                return "無此步驟";
        }
    }

    return (
        <>
            <AppBar 
                position="absolute" 
                color="default" 
                elevation={0} 
                sx={{
                    position: 'relative', 
                    borderBottom: (target) => `1px solid ${target.palette.divider}`
                }}
            >
                <Box sx={{ minWidth: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="h4" sx={{ p: 2 }}>
                        麗山高中
                    </Typography>
                    <Login />
                </Box>
            </AppBar>
            <Container>
                <Paper variant="outlined" sx={{ my: { md: 12 }, p: { md: 6 } }}>
                <Typography variant="h3" align="center">
                    麗山高中 自主學習
                </Typography>
                <Stepper activeStep={currentStep} sx={{ my: { md: 5 } }}>
                    {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>
                                    <Typography variant="h6">
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                
                {currentStep === steps.length ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            已送出
                        </Typography>
                    </>
                ) : (
                    <>

                        {renderStep(currentStep)}

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button 
                                color="inherit" 
                                disabled={currentStep === 0} 
                                onClick={handleBack} 
                                sx={{ mr: 1 }}
                                variant="contained"
                            >
                                返回
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} color="primary" variant="contained">
                                {currentStep === steps.length - 1 ? '繳交' : '下一步'}
                            </Button>
                        </Box>
                    </>
                )}
                </Paper>
            </Container>
        </>
    );
}

export default Submit;
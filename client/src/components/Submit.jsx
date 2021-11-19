import '../css/App.css';
import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Container, Step, Stepper, StepLabel, Paper, Typography} from '@mui/material';
import StudentIDForm from './FormComponents/StudentIDForm';
import TopicForm from './FormComponents/TopicForm';
import Confirm from './FormComponents/Confirm';

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

    const handleNext = useCallback((e) => {
        setCurrentStep(currentStep + 1);
    }, [currentStep]);

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const setStudentForm = (e) => {
        setStudentId(e.target.value);
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

    const handleReset = () => {
        setStudentId('');
    };

    const handleTopicReset = () => {
        setTopicValue('');
        setSubTopicValue('');
        setOtherTopicValue('');
    }

    useEffect(() => {
        const listener = e => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
                e.preventDefault();
                handleNext();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [handleNext]);

    const studentProps = { studentId, setStudentForm, handleReset };
    const topicProps = {
        topics,
        topicValue,
        subTopics,
        subTopicValue,
        otherTopicValue,
        handleTopicChange,
        handleSubTopicChange,
        handleOtherTopicChange, 
        handleTopicReset
    };
    const confirmProps = { studentId, topics, topicValue, subTopics, subTopicValue, otherTopicValue };

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
                                <Button color="primary" variant="contained" onClick={handleNext}>
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
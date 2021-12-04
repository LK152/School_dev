import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    InputLabel,
    FormControl,
    styled,
    IconButton,
    Typography,
} from '@mui/material';
import { Send, DeleteOutline } from '@mui/icons-material';
import { mainTopics, subTopics } from './Options';
import Select from './Select';
import StudentIdValidator from '../validator/StudentIdValidator';
import '../App.css';

const initialValues = {
    studentId: '',
    mainTopic: '',
    subTopic: '',
    otherTopic: '',
    isSent: false,
};

const Submitbtn = styled(Button)({
    border: '1px solid rgb(25, 118, 210)',
    boxSizing: 'border-box',
    transition: '.5s ease-in-out',
    overflow: 'hidden',
    '&:before': {
        content: '""',
        borderRight: '50px solid transparent',
        borderTop: '36px solid rgb(25, 118, 210)',
        transform: 'translateX(-100%)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: -50,
        left: 0,
        transition: '.5s ease-in-out',
    },
    '&:hover': {
        color: '#FFF',
        '&:before': {
            transform: 'translateX(0)',
            transition: '.5s ease-in-out',
        },
    },
});

const Form = () => {
    const [values, setValues] = useState(initialValues);

    const handleTextChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleTopicChange = (value) => {
        setValues({ ...values, mainTopic: value });
    };

    const handleSubTopicChange = (value) => {
        setValues({ ...values, subTopic: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, isSent: true });
    };

    const handleDelete = () => {
        setValues(initialValues);
    };

    switch (values.isSent) {
        case true:
            return (
                <Typography variant="h1" align="center">
                    已送出
                </Typography>
            );

        default:
            return (
                <form onSubmit={handleSubmit}>
                    <Box sx={{ my: { xs: 3 } }}>
                        <FormControl fullWidth>
                            <TextField
                                variant="filled"
                                label="學號"
                                name="studentId"
                                value={values.studentId}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Box>
                    {StudentIdValidator(values.studentId) && (
                        <Box sx={{ my: { xs: 3 } }}>
                            <FormControl fullWidth>
                                <InputLabel>主題 *</InputLabel>
                                <Select
                                    label="主題 *"
                                    name="mainTopic"
                                    options={mainTopics}
                                    value={values.mainTopic}
                                    onChange={handleTopicChange}
                                />
                            </FormControl>
                        </Box>
                    )}
                    {values.mainTopic !== '' && values.mainTopic !== 8 && (
                        <Box sx={{ my: { xs: 3 } }}>
                            <FormControl fullWidth>
                                <InputLabel>副主題 *</InputLabel>
                                <Select
                                    label="副主題 *"
                                    name="subTopic"
                                    options={subTopics[values.mainTopic]}
                                    value={values.subTopic}
                                    onChange={handleSubTopicChange}
                                />
                            </FormControl>
                        </Box>
                    )}
                    {values.mainTopic === 8 && (
                        <Box sx={{ my: { xs: 3 } }}>
                            <FormControl fullWidth>
                                <TextField
                                    variant="filled"
                                    label="其他"
                                    name="otherTopic"
                                    value={values.otherTopic}
                                    onChange={handleTextChange}
                                />
                            </FormControl>
                        </Box>
                    )}
                    <IconButton onClick={handleDelete}>
                        <DeleteOutline />
                    </IconButton>
                    <Submitbtn
                        type="submit"
                        disableRipple
                        sx={{ float: 'right' }}
                    >
                        <div className="submitBtn" id="submitBtn">
                            送出
                            <Send id="sendIcon" />
                        </div>
                    </Submitbtn>
                </form>
            );
    }
};

export default Form;

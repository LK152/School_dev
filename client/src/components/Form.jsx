import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    InputLabel,
    FormControl,
    FormHelperText,
    styled,
    IconButton,
    Typography,
} from '@mui/material';
import { Send, DeleteOutline } from '@mui/icons-material';
import { mainTopics, subTopics, members } from './Options';
import Select from './Select';
import StudentIdValidator from '../validator/StudentIdValidator';
import '../App.css';

const initialValues = {
    studentId: '',
    mainTopic: '',
    subTopic: '',
    otherTopic: '',
    isSent: false,
    members: '',
    memberInfo1: '',
    memberInfo2: '',
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

    const handleMemberSelect = (value) => {
        setValues({ ...values, members: value });
    };

    const handleValidation = () => {
        if (values.mainTopic === '') {
            return true;
        } else if (values.mainTopic !== 8) {
            if (values.subTopic === '') {
                return true;
            } else {
                if (values.members === '') {
                    return true;
                } else if (values.members === 2) {
                    if (values.memberInfo1.length < 5) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (values.members === 3) {
                    if (
                        values.memberInfo1.length < 5 ||
                        values.memberInfo2.length < 5
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            if (values.otherTopic === '') {
                return true;
            } else {
                return false;
            }
        }
    };

    const memberInput = (num) => {
        let fields = [];
        for (var i = 1; i < num; i++) {
            fields.push(
                <FormControl fullWidth>
                    <TextField
                        label={'學生' + i}
                        value={
                            i === 1 ? values.memberInfo1 : values.memberInfo2
                        }
                        onChange={handleTextChange}
                        name={'memberInfo' + i}
                        error={handleValidation()}
                    />
                    <FormHelperText>輸入5碼學生班級座號</FormHelperText>
                </FormControl>
            );
        }
        return (
            <Box
                sx={{
                    my: { xs: 3 },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                {fields}
            </Box>
        );
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
                                error={!StudentIdValidator(values.studentId)}
                                value={values.studentId}
                                onChange={handleTextChange}
                            />
                            {!StudentIdValidator(values.studentId) && (
                                <FormHelperText>請輸入8碼學號</FormHelperText>
                            )}
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
                    {(values.subTopic !== '' || values.otherTopic !== '') && (
                        <Box sx={{ my: { xs: 3 } }}>
                            <FormControl fullWidth>
                                <InputLabel>組員人數</InputLabel>
                                <Select
                                    label="組員人數"
                                    name="members"
                                    options={members}
                                    value={values.members}
                                    onChange={handleMemberSelect}
                                />
                            </FormControl>
                        </Box>
                    )}
                    {values.members !== 1 && <>{memberInput(values.members)}</>}
                    <IconButton onClick={handleDelete}>
                        <DeleteOutline />
                    </IconButton>
                    <Submitbtn
                        type="submit"
                        disableRipple
                        disabled={handleValidation()}
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

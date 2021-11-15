import { Fragment, useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const topics = [null, '延伸與預修課程', '課外閱讀', '線上學習課程', '能力檢定', '服務學習課程', '培訓課程', '專題研究', '其他'];

const TopicForm = () => {
    const [topic, setTopic] = useState('');

    const handleChange = (e) => {
        setTopic(e.target.value);
    }

    const renerNextSelect = (topic) => {
        switch(topic) {
            case 1: 
                return (
                    <Fragment>
                        <Box sx={{ width: 520 }}>
                            <FormControl fullWidth>
                                <InputLabel>{topics[topic]}</InputLabel>
                                <Select label={topics[topic]}>
                                    <MenuItem value={topic + 0.1}>延伸中文</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Fragment>
                );
            
            default: 
                    return;
        }
    }

    return (
        <Box sx={{ width: 1100, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: 550, flex: '1 1 auto' }}>
                <FormControl fullWidth>
                    <InputLabel>主題</InputLabel>
                    <Select label="主題" onChange={handleChange} value={topic}>
                        <MenuItem value={1}>延伸與預修課程</MenuItem>
                        <MenuItem value={2}>課外閱讀</MenuItem>
                        <MenuItem value={3}>線上學習課程</MenuItem>
                        <MenuItem value={4}>能力檢定</MenuItem>
                        <MenuItem value={5}>服務學習課程</MenuItem>
                        <MenuItem value={6}>培訓課程</MenuItem>
                        <MenuItem value={7}>專題研究</MenuItem>
                        <MenuItem value={8}>其他</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
                {renerNextSelect(topic)}
            </Box>
        </Box>
    );
}

export default TopicForm;
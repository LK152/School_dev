import { Fragment, useState } from 'react';
import { Box, FormControl, InputLabel } from '@mui/material';
import ControlledSelect from './ControlledSelect';

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

const subTopics = [
    [ 
        ['延伸中文'], 
        ['延伸英文'], 
        ['延伸自然'], 
        ['延伸社會'], 
        ['延伸數學'], 
        ['延伸藝能']
    ], 
    [ 
        ['課外中文'], 
        ['課外英文'], 
        ['課外數學'], 
        ['課外自然'], 
        ['課外社會'], 
        ['課外藝能']
    ], 
    [
        ['線上大學平台課程'], 
        ['線上語文'], 
        ['線上數學'], 
        ['線上自然'], 
        ['線上社會'], 
        ['線上藝能台英聯盟']
    ], 
    [
        ['能力檢定-資訊'], 
        ['能力檢定-英文'], 
        ['能力檢定-其他']
    ], 
    [
        ['服務星嵐'], 
        ['服務星晞'], 
        ['服務公民科學家']
    ], 
    [
        ['選手培訓'], 
        ['其他']
    ], 
    [
        ['國文'], 
        ['英文'], 
        ['數學'], 
        ['物理'], 
        ['化學'], 
        ['生物'], 
        ['地科'], 
        ['資訊'], 
        ['生科'], 
        ['歷史'], 
        ['地理'], 
        ['公民'], 
        ['其他'], 
    ]
];

const TopicForm = () => {
    const [topicValue, setTopicValue] = useState('');
    const [subTopicValue, setSubTopicValue] = useState('');

    const handleTopicChange = (value) => {
        console.log(topicValue);
        setTopicValue(value);
    }

    const handleSubTopicChange = (value) => {
        setSubTopicValue(value);
    }

    const renerNextSelect = (value) => {
        switch(value) {
            case '1': 
                return (
                    <Fragment>
                        <Box sx={{ width: 520 }}>
                            <FormControl fullWidth>
                                <InputLabel>{topics[topicValue]}</InputLabel>
                                <ControlledSelect 
                                    label={topics[topicValue]} 
                                    value={subTopicValue} 
                                    options={subTopics} 
                                    onChange={handleSubTopicChange} 
                                />
                            </FormControl>
                        </Box>
                    </Fragment>
                );
            
            default:
        }
    }

    return (
        <Box sx={{ width: 1100, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: 550, flex: '1 1 auto' }}>
                <FormControl fullWidth>
                    <InputLabel>主題</InputLabel>
                    <ControlledSelect 
                        label="主題" 
                        value={topicValue} 
                        options={topics} 
                        onChange={handleTopicChange} 
                    />
                </FormControl>
            </Box>
            {renerNextSelect(topicValue)}
        </Box>
    );
}

export default TopicForm;
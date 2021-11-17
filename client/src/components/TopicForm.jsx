import { Box, FormControl, InputLabel, TextField } from '@mui/material';
import ControlledSelect from './ControlledSelect';

const TopicForm = ({ 
    topics, 
    topicValue, 
    subTopics, 
    subTopicValue, 
    otherTopicValue, 
    handleTopicChange,  
    handleSubTopicChange, 
    handleOtherTopicChange 
}) => {
    const renderNextSelect = (value) => {
        return ( 
            <Box sx={{ maxWidth: 400, flex: '1 1 auto' }}>
                <FormControl fullWidth>
                    {(value !== 8) ? (
                        <>
                            <InputLabel>副主題 *</InputLabel>
                            <ControlledSelect 
                                label="副主題 *" 
                                value={subTopicValue} 
                                options={subTopics[value]}
                                onChange={handleSubTopicChange} 
                            />
                        </>
                    ) : (
                        <>
                            <TextField label="其他主題 *" variant="outlined" value={otherTopicValue} onChange={handleOtherTopicChange} />
                        </>
                    )}
                </FormControl>
            </Box>
        );
    }

    return (
        <Box sx={{ width: 1050, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', my: { xs: 6, md: 12 } }}>
            <Box sx={{ maxWidth: 400, flex: '1 1 auto' }}>
                <FormControl fullWidth>
                    <InputLabel>主題 *</InputLabel>
                    <ControlledSelect 
                        label="主題 *"
                        value={topicValue} 
                        options={topics} 
                        onChange={handleTopicChange} 
                    />
                </FormControl>
            </Box>
            {(topicValue !== '') && renderNextSelect(topicValue)}
        </Box>
    );
}

export default TopicForm;
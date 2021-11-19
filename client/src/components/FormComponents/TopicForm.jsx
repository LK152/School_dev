import { Box, FormControl, InputLabel, TextField } from '@mui/material';
import ControlledSelect from '../ControlledSelect';

const TopicForm = (props) => {
    const renderNextSelect = (value) => {
        return ( 
            <Box sx={{ maxWidth: 400, flex: '1 1 auto' }}>
                <FormControl fullWidth>
                    {(value !== 8) ? (
                        <>
                            <InputLabel>副主題 *</InputLabel>
                            <ControlledSelect 
                                label="副主題 *" 
                                value={props.subTopicValue} 
                                options={props.subTopics[value]}
                                onChange={props.handleSubTopicChange} 
                            />
                        </>
                    ) : (
                        <>
                            <TextField label="其他主題 *" variant="outlined" value={props.otherTopicValue} onChange={props.handleOtherTopicChange} />
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
                        value={props.topicValue} 
                        options={props.topics} 
                        onChange={props.handleTopicChange} 
                    />
                </FormControl>
            </Box>
            {(props.topicValue !== '') && renderNextSelect(props.topicValue)}
        </Box>
    );
}

export default TopicForm;
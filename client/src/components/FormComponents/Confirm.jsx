import { Box, Typography } from '@mui/material';

const Confirm = (props) => {
    const findItem = (array, value) => {
        return array.find(obj => obj.value === value)
    }

    return (
        <Box sx={{ minWidth: 1050, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">
                    學號
                </Typography>
                <Typography variant="h6">
                    {props.studentId}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">
                    主題
                </Typography>
                <Typography variant="h6">
                    {findItem(props.topics, props.topicValue).label}
                </Typography>
                <Typography variant="h5">
                    副主題
                </Typography>
                <Typography variant="h6">
                    {findItem(props.subTopics[props.topicValue], props.subTopicValue).label}
                </Typography>
            </Box>
        </Box>
    );
}

export default Confirm;
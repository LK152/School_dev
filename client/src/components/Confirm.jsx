import { Box, Typography } from '@mui/material';

const Confirm = ({ studentId, topics, topicValue }) => {
    return (
        <Box sx={{ minWidth: 1050, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">
                    學號
                </Typography>
                <Typography variant="h6">
                    {studentId}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">
                    主題
                </Typography>
                <Typography variant="h6">
                    {topics[topicValue]}
                </Typography>
            </Box>
        </Box>
    );
}

export default Confirm;
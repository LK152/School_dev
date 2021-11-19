import { Box, TextField, FormControl, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const StudentIDForm = (props) => {
    return (
        <Box component="form" sx={{ width: '50%', ml: 5, my: 8, display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth>
                <TextField variant="standard" label="學號" required value={props.studentId} onChange={props.setStudentForm} />
            </FormControl>
            <IconButton onClick={props.handleReset}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}

export default StudentIDForm;
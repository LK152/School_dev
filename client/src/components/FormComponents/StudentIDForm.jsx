import { Box, TextField, FormControl } from '@mui/material';

const StudentIDForm = ({ studentId, setStudentForm }) => {
    return (
        <Box component="form" sx={{ width: '50%', ml: 5, my: 8 }}>
            <FormControl fullWidth>
                <TextField variant="standard" label="學號" required value={studentId} onChange={setStudentForm} />
            </FormControl>
        </Box>
    );
}

export default StudentIDForm;
import { Fragment } from 'react';
import { TextField, FormControl } from '@mui/material';

const StudentIDForm = () => {
    return (
        <Fragment>
            <FormControl fullWidth>
                <TextField variant="standard" placeholder="學號" />
            </FormControl>
        </Fragment>
    )
}

export default StudentIDForm;
import { useState } from 'react';
import {
    Container,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    FormControl,
    TextField,
    InputLabel,
} from '@mui/material';
import UsersTable from './UsersTable';
import Select from './Select';
import axios from 'axios';
import { permit, classes } from './Options';

const init = {
    email: '',
    isAdmin: false,
    userClass: '',
};

const Users = () => {
    const [newUser, setNewUser] = useState(init);
    const [update, setUpdate] = useState(false);

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        await axios.post(
            'http://localhost:8000/addUser/' + newUser.email,
            newUser
        );
        setUpdate(!update);
    };

    return (
        <Container sx={{ my: 10 }}>
            <Card raised>
                <CardContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h2" textAlign="center">
                                用戶
                            </Typography>
                        </Grid>
                        <Grid item>
                            <UsersTable update={update} />
                        </Grid>
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleChange}
                                        name="email"
                                        variant="filled"
                                        label="帳戶"
                                        value={newUser.email}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>班級</InputLabel>
                                    <Select
                                        label="班級"
                                        options={classes}
                                        value={newUser.userClass}
                                        name="userClass"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>權限</InputLabel>
                                    <Select
                                        label="權限"
                                        options={permit}
                                        value={newUser.isAdmin}
                                        name="isAdmin"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleAddUser}
                                    variant="contained"
                                    disabled={newUser.email === ''}
                                >
                                    新增用戶
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Users;

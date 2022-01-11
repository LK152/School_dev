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
    FormHelperText,
} from '@mui/material';
import UsersTable from './UsersTable';
import CreateUser from '../api/CreateUser';
import Select from './Select';
import { permit } from './Options';

const init = {
    email: '',
    password: '',
    isAdmin: false,
};

const Users = () => {
    const [newUser, setNewUser] = useState(init);

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        CreateUser(newUser)
            .then(() => {
                setNewUser(init);
            })
            .catch((err) => {
                alert(err);
            });
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
                            <UsersTable />
                        </Grid>
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleChange}
                                        name="email"
                                        variant="filled"
                                        label="帳戶"
                                        value={newUser.email}
                                    />
                                </FormControl>
                                <FormHelperText>用戶Email</FormHelperText>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleChange}
                                        name="password"
                                        variant="filled"
                                        label="密碼"
                                        value={newUser.password}
                                    />
                                    <FormHelperText>
                                        密碼長度大於6位數
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
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
                                    disabled={
                                        newUser.email === '' ||
                                        newUser.password.length < 6
                                    }
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

import { useContext } from 'react';
import {
    Grid,
    TextField,
    FormControl,
    Typography,
    Card,
    CardContent,
    Container,
    Button,
} from '@mui/material';
import { ModalContext } from '../context/ModalContext';
import LoginUser from '../api/LoginUser';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const init = {
    email: '',
    password: '',
};

const Login = () => {
    const { userObj } = useContext(ModalContext);
    const [user, setUser] = userObj;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        LoginUser(user)
            .then(() => {
                setUser(init);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
            });
    };

    return (
        <Container sx={{ my: 10 }}>
            <Card raised>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="h2" align="center">
                                    教師登入
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        variant="filled"
                                        label="Email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        variant="filled"
                                        label="密碼"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ float: 'right' }}
                                    disabled={
                                        user.email === '' ||
                                        user.password.length < 6
                                    }
                                >
                                    登入
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;

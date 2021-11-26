import { useState } from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import Login from './Login';
import Submit from './Submit';
import NoAuth from './NoAuth';

const NotLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const renderAuth = (state) => {
        switch (state) {
            case true:
                return <Submit />
            
            default:
                return <NoAuth />
        }
    }

    return (
        <>
            <AppBar 
                    elevation={0} 
                    sx={{
                        position: 'fixed',
                        backgroundColor: "#f3905f", 
                        borderBottom: (target) => `1px solid ${target.palette.divider}`
                    }}
                >
                <Box sx={{ minWidth: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ p: 2 }}>
                        麗山高中
                    </Typography>
                    <Login Auth={state => setIsLoggedIn(state)} />
                </Box>
            </AppBar>
            {renderAuth(isLoggedIn)}
        </>
    )
}

export default NotLoggedIn;
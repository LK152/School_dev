import '../css/NavBar.css';
import { Fragment, useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';

const AccountMenu = ({ userName, userEmail, userAvatar }) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Fragment>
            <IconButton onClick={handleClick}>
                <Avatar alt="User Avatar" src={userAvatar} />
            </IconButton>
            
            <Menu 
                anchorEl={anchorEl} 
                open={open} 
                onClose={handleClose} 
                onClick={handleClose} 
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                    </MenuItem>
                </Menu>
        </Fragment>
    )
}

export default AccountMenu;
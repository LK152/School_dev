import '../css/App.css';
import { Fragment, useState } from 'react';
import { Avatar, Divider, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';

const AccountMenu = (props) => {
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
            <IconButton onClick={handleClick} className="usr-icon">
                <Avatar alt="User Avatar" src={props.userAvatar} />
            </IconButton>
            
            <Menu 
                anchorEl={anchorEl} 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className="usr-details">
                    <img alt="User Avatar" src={props.userAvatar} className="usr-img" />
                    <div className="usr-profile">
                        {props.userName}
                        <br />
                        {props.userEmail}
                    </div>
                </div>
                <Divider />
                <MenuItem onClick={props.logOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default AccountMenu;
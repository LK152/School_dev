import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(
        () =>
            axios
                .get('http://localhost:8000/getUsers')
                .then((doc) => setUsers(doc.data)),
        []
    );

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 60,
        },
        {
            field: 'email',
            headerName: '帳戶',
            width: 200,
        },
        {
            field: 'permission',
            headerName: 'Permission',
            width: 160,
        },
        {
            field: 'delete',
            headerName: '刪除',
            width: 100,
            renderCell: (params) => {
                const handleClick = async (e) => {
                    e.stopPropagation();

                    await axios.delete(
                        'http://localhost:8000/deleteUser/' + params.row.email
                    );
                };

                return (
                    <Button variant="contained" onClick={handleClick}>
                        刪除
                    </Button>
                );
            },
        },
    ];

    const rows = users.map((user, index) => {
        return {
            id: index,
            email: user.email,
            permission: user.isAdmin ? 'Administrator' : 'Teacher',
        };
    });

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[100]}
                disableColumnFilter
                disableColumnMenu
            />
        </div>
    );
};

export default UsersTable;

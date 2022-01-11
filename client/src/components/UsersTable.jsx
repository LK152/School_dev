import { useEffect, useState } from 'react';
import { db } from '../service/firestore';
import { onSnapshot, collection } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(
        () =>
            onSnapshot(collection(db, 'userData'), (querySnap) => {
                const user = [];

                querySnap.forEach((doc) => {
                    user.push(doc.data());
                });

                setUsers(user);
            }),
        []
    );

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
        },
        {
            field: 'email',
            headerName: '帳戶',
            width: 200,
        },
        {
            field: 'password',
            headerName: '密碼',
            width: 160,
        },
        {
            field: 'permission',
            headerName: 'Permission',
            width: 160,
        },
    ];

    const rows = users.map((user, index) => {
        return {
            id: index,
            email: user.email,
            password: user.password,
            permission: user.isAdmin ? 'Administrator' : 'Teacher',
        };
    });

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableColumnFilter
                disableColumnMenu
            />
        </div>
    );
};

export default UsersTable;

import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { db } from '../service/firestore';
import { collection, onSnapshot } from 'firebase/firestore';
import { useModalContext } from '../context/ModalContext';
import useSessionState from '../hooks/useSessionState';

const EternalUsers = {
    user1: 'learningplan@lssh.tp.edu.tw',
    user2: 'lib@lssh.tp.edu.tw',
};

const UsersTable = () => {
    const [users, setUsers] = useSessionState('users', []);
    const { updateObj, infoObj } = useModalContext();
    const [update, setUpdate] = updateObj;
    const [info] = infoObj;

    const axios = rateLimit(Axios.create(), {
        maxRequests: 2,
        perMilliseconds: 1000,
        maxRPS: 2,
    });

    useEffect(() => {
        const unSub = onSnapshot(collection(db, 'users'), (snap) => {
            const users = [];

            if (!snap.empty) {
                snap.forEach((user) => {
                    users.push(user.data());
                });
            }

            setUsers(users);
        });

        return () => unSub();
    }, [update, setUsers]);

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
            editable: true,
        },
        {
            field: 'delete',
            headerName: '刪除',
            width: 100,
            renderCell: (params) => {
                const handleClick = async (e) => {
                    e.stopPropagation();

                    await axios.delete(
                        process.env.REACT_APP_API_URL +
                            '/deleteUser/' +
                            params.row.email
                    );

                    setUpdate(!update);
                };

                return (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={
                            params.row.email === info.email ||
                            params.row.email === EternalUsers.user1 ||
                            params.row.email === EternalUsers.user2
                        }
                    >
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
                disableSelectionOnClick
                checkboxSelection
            />
        </div>
    );
};

export default UsersTable;

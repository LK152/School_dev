import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import { db } from '../service/firestore';
import { collection, onSnapshot } from 'firebase/firestore';
import { useModalContext } from '../context/ModalContext';

const EternalUsers = {
	user1: 'learningplan@lssh.tp.edu.tw',
	user2: 'lib@lssh.tp.edu.tw',
};

const UsersTable = () => {
	const [users, setUsers] = useState([]);
	const { updateObj, infoObj } = useModalContext();
	const [update, setUpdate] = updateObj;
	const [info] = infoObj;

	useEffect(() => {
		const unSub = onSnapshot(collection(db, 'userData'), (snap) => {
			const users = [];

			if (!snap.empty) {
				snap.forEach((user) => {
					users.push(user.data());
				});
			}

			setUsers(users);
		});

		return () => unSub();
	}, [update]);

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
						variant='contained'
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
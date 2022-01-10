import { useEffect } from 'react';
import { db } from '../service/firestore';
import { onSnapshot, collection, query, limit } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'email', headerName: '帳戶', width: 160 },
	{ field: 'password', headerName: '密碼', width: 160 },
];

const rows = [{ id: 1, email: 'wuluke0@gmail.com', password: '123456' }];

const UsersTable = () => {
	const q = query(collection(db, 'userData'), limit(10));

	useEffect(
		() =>
			onSnapshot(q, (querySnap) => {
				const users = [];
				querySnap.forEach((user) => {
					users.push(user.data());
				});
			}),
		[q]
	);

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

import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import useAuth from '../src/context/AuthContext';
import useStateContext from '../src/context/StateContext';

const EternalUsers = {
	user1: 'learningplan@lssh.tp.edu.tw',
	user2: 'lib@lssh.tp.edu.tw',
};

const UsersTable = () => {
	const { user } = useAuth();
	const { users } = useStateContext();

	const columns = [
		{
			field: 'id',
			headerName: '順序',
			width: 100,
		},
		{
			field: 'email',
			headerName: '帳戶',
			width: 300,
		},
		{
			field: 'permission',
			headerName: '權限',
			width: 160,
		},
		{
			field: 'class',
			headerName: '班級',
			width: 160,
		},
		{
			field: 'delete',
			headerName: '刪除',
			width: 100,
			renderCell: (params) => {
				const handleClick = async (e) => {
					e.stopPropagation();

					await axios.delete(`/api/admin/${params.row.email}`);
				};

				return (
					<Button
						variant='contained'
						onClick={handleClick}
						disabled={
							params.row.email === user?.email ||
							params.row.email === EternalUsers.user1 ||
							params.row.email === EternalUsers.user2
						}
					>
						<Typography color='common.white'>刪除</Typography>
					</Button>
				);
			},
		},
	];

	const rows = users.map((user, index) => {
		return {
			id: index,
			email: user.email,
			permission: user.isAdmin ? '管理員' : '導師',
			class: user.teacherClass,
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
			/>
		</div>
	);
};

export default UsersTable;

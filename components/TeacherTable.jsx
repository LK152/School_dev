import { useState } from 'react';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import exportXL from './export/exportXL';
import useStateContext from '@src/context/StateContext';

const columns = [
	{
		field: 'classNumber',
		headerName: '班級座號',
		width: 100,
	},
	{
		field: 'name',
		headerName: '姓名',
		width: 80,
	},
	{
		field: 'topic',
		headerName: '主題',
		width: 120,
	},
	{
		field: 'subTopic',
		headerName: '副主題',
		width: 120,
	},
	{
		field: 'memNum',
		headerName: '組員人數',
		width: 100,
	},
	{
		field: 'mem1',
		headerName: '組員1',
		width: 80,
	},
	{
		field: 'mem2',
		headerName: '組員2',
		width: 80,
	},
	{
		field: 'group',
		headerName: '組別',
		width: 100,
	},
	{
		field: 'location',
		headerName: '地點',
		width: 100,
	},
	{
		field: 'comment',
		headerName: '備註',
		width: 160,
	},
];

const TeacherTable = () => {
	const [pageSize, setPageSize] = useState(50);
	const { studentRecord, authState } = useStateContext();
	const { isAdmin, teacherGroup } = authState;

	const handleExport = () => {
		exportXL(studentRecord, '自主學習');
	};

	const CustomToolbar = () => {
		return (
			<GridToolbarContainer
				sx={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<GridToolbarDensitySelector size='medium' />
				<Button onClick={handleExport}>
					<Download />
					匯出
				</Button>
			</GridToolbarContainer>
		);
	};

	const handleClass = (record) => {
		return record.group === teacherGroup;
	};

	const studentRecords = studentRecord.filter(handleClass);

	const rows = studentRecords.map((doc) => {
		return {
			id: doc.email,
			name: doc.studentName,
			classNumber:
				doc.studentClass.toString() +
				(doc.number < 10
					? '0' + doc.number.toString()
					: doc.number.toString()),
			topic: doc.topic,
			subTopic: doc.subTopic,
			comment: doc.comment !== '' ? doc.comment : 'N/A',
			memNum: doc.memNum,
			mem1:
				doc.mem1Class !== '' && doc.mem1Num !== ''
					? doc.mem1Class.toString() +
					  (doc.mem1Num < 10
							? '0' + doc.mem1Num.toString()
							: doc.mem1Num.toString())
					: 'N/A',
			mem2:
				doc.mem2Class !== '' && doc.mem2Num !== ''
					? doc.mem2Class.toString() +
					  (doc.mem2Num < 10
							? '0' + doc.mem2Num.toString()
							: doc.mem2Num.toString())
					: 'N/A',
			group: doc.group,
		};
	});

	return (
		<div style={{ height: '50vh', width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				onPageSizeChange={(newPS) => setPageSize(newPS)}
				rowsPerPageOptions={[10, 25, 50, 100]}
				components={{ Toolbar: isAdmin && CustomToolbar }}
				disableColumnFilter
				disableColumnMenu
				disableSelectionOnClick
			/>
		</div>
	);
};

export default TeacherTable;

import { useState } from 'react';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { Cancel, Download, Warning } from '@mui/icons-material';
import exportXL from './export/exportXL';
import useStateContext from '@src/context/StateContext';
import useOption from '@src/context/OptionContext';
import Select from './Select';
import axios from 'axios';

const columns = [
	{
		field: 'id',
		headerName: '學生uid',
		width: 100,
	},
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
		width: 140,
	},
	{
		field: 'subTopic',
		headerName: '副主題',
		width: 140,
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
		minWidth: 600,
	},
];

const StudentTable = ({ handleSelect }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [pageSize, setPageSize] = useState(50);
	const {
		studentRecord,
		authState,
		selectedValues,
		setSelected,
		setSelectedIds,
	} = useStateContext();
	const { classes, groups } = useOption();
	const { isAdmin, isTeacher, teacherClass } = authState;
	const { selection } = selectedValues;
	const classesOptions = ['全部'].concat(classes).map((Class) => {
		return {
			label: `${Class}\xa0\xa0\xa0\xa0\xa0\xa0\xa0${
				studentRecord?.filter((doc) => {
					return Class !== '全部'
						? doc.studentClass === Class
						: studentRecord.length;
				})?.length
			}人`,
			value: Class,
		};
	});

	const handleExport = () => {
		exportXL(studentRecord, '自主學習', groups);
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleBulkDelete = () => {
		axios.delete('/api/bulkDelete');
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setValue('');
	};

	const CustomToolbar = () => {
		return (
			<GridToolbarContainer
				sx={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<Select
					name='selection'
					options={classesOptions}
					onChange={handleSelect}
					value={selection}
				/>
				<GridToolbarDensitySelector size='medium' />
				<Button onClick={handleExport}>
					<Download />
					匯出
				</Button>
				<Button onClick={handleOpen}>
					<Warning />
					全部刪除
				</Button>
			</GridToolbarContainer>
		);
	};

	const handleSelectionFilter = (record) => {
		if (selection === '全部') {
			return record;
		}

		return record.studentClass.toString() === selection;
	};

	const handleTeacherFilter = (record) => {
		return record.studentClass === teacherClass;
	};

	const studentRecords = studentRecord.filter(
		isTeacher ? handleTeacherFilter : handleSelectionFilter
	);

	const rows = studentRecords.map((doc) => {
		return {
			id: doc.uid,
			email: doc.email,
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
			location: doc.groupLocation,
		};
	});

	return (
		<>
			<div style={{ height: 600, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={pageSize}
					onPageSizeChange={(newPS) => setPageSize(newPS)}
					rowsPerPageOptions={[10, 25, 50, 100]}
					components={{ Toolbar: isAdmin && CustomToolbar }}
					onSelectionModelChange={(ids) => {
						const selectedIDs = new Set(ids);
						const selectedRows = rows.filter((row) => {
							return selectedIDs.has(row.id);
						});

						setSelected(selectedRows);
						setSelectedIds(ids);
					}}
					disableColumnFilter
					disableColumnMenu
					disableSelectionOnClick
					checkboxSelection={isAdmin}
					initialState={{
						columns: { columnVisibilityModel: { id: false } },
					}}
				/>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>確認刪除?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						此舉將會刪除所有學生資料, 確認?
					</DialogContentText>
					<TextField value={value} onChange={handleChange} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						<Cancel />
						取消
					</Button>
					<Button
						onClick={handleBulkDelete}
						disabled={value !== '確認'}
					>
						確認
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default StudentTable;

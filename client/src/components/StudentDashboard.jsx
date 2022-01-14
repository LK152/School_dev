import { useEffect, useState } from 'react';
import { db } from '../service/firestore';
import { onSnapshot, collection } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';
import { useModalContext } from '../context/ModalContext';

const StudentDashboard = () => {
    const [studentRecord, setRecord] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(collection(db, 'studentData'), (snapshot) => {
            const docs = [];

            if (!snapshot.empty) {
                snapshot.forEach((doc) => {
                    docs.push(doc.data());
                });
            } else {
                setRecord(null);
            }

            setRecord(docs);
        });

        return () => unSub();
    }, []);

    const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 60,
		},
		{
			field: 'email',
			headerName: '學生Email',
			width: 200,
		},
		{
			field: 'class',
			headerName: '班級',
			width: 160,
        },
        {
			field: 'number',
			headerName: '座號',
			width: 160,
        },
        {
			field: 'topic',
			headerName: '主題',
			width: 160,
        },
        {
			field: 'subTopic',
			headerName: '副主題',
			width: 160,
        },
        {
			field: 'comment',
			headerName: '備註',
			width: 160,
        },
        {
			field: 'memNum',
			headerName: '組員人數',
			width: 160,
        },
    ];
    
    const rows = studentRecord.map((doc, index) => {
		return {
			id: index,
            email: doc.email,
            class: doc.class, 
            number: doc.number, 
            topic: doc.topicLabel, 
            subTopic: doc.subTopicLabel, 
            comment: doc.comment, 
            memnNum: doc.memNum
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

export default StudentDashboard;

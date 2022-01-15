import { useEffect } from 'react';
import { db } from '../service/firestore';
import { onSnapshot, collection } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';
import useSessionState from '../hooks/useSessionState';

const StudentDashboard = () => {
    const [studentRecord, setRecord] = useSessionState('record', []);

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
    }, [setRecord]);

    const columns = [
        {
            field: 'id',
            headerName: '班級座號',
            width: 100,
        },
        {
            field: 'email',
            headerName: '學生Email',
            width: 200,
        },
        {
            field: 'topic',
            headerName: '主題',
            width: 140,
        },
        {
            field: 'subTopic',
            headerName: '副主題',
            width: 80,
        },
        {
            field: 'comment',
            headerName: '備註',
            width: 160,
        },
        {
            field: 'memNum',
            headerName: '組員人數',
            width: 100,
        },
        {
            field: 'mem1',
            headerName: '組員1',
            width: 100,
        },
        {
            field: 'mem2',
            headerName: '組員2',
            width: 100,
        },
    ];

    const rows = studentRecord.map((doc) => {
        return {
            id:
                doc.class.toString() +
                (doc.number < 10
                    ? '0' + doc.number.toString()
                    : doc.number.toString()),
            email: doc.email,
            topic: doc.topicLabel,
            subTopic: doc.subTopicLabel,
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

export default StudentDashboard;

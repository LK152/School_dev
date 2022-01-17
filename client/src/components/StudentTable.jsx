import { useEffect, useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { useModalContext } from '../context/ModalContext';
import { db } from '../service/firestore.js';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { exportClasses } from './Options';
import Select from './Select';

const StudentTable = () => {
    const [values, setValues] = useState({
        selection: 0,
    });
    const { recordObj, authObj } = useModalContext();
    const [studentRecord, setRecord] = recordObj;
    const [authState] = authObj;

    useEffect(() => {
        const unSub = onSnapshot(
            authState.isAdmin
                ? values.selection !== 0
                    ? query(
                          collection(db, 'studentData'),
                          where('class', '==', values.selection)
                      )
                    : collection(db, 'studentData')
                : query(
                      collection(db, 'studentData'),
                      where('class', '==', authState.class)
                  ),
            (snapshot) => {
                const docs = [];

                if (!snapshot.empty) {
                    snapshot.forEach((doc) => {
                        docs.push(doc.data());
                    });
                } else {
                    setRecord([]);
                }

                setRecord(docs);
            }
        );

        return () => unSub();
    }, [setRecord, values, authState]);

    const handleSelect = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                {authState.isAdmin && (
                    <Select
                        name='selection'
                        options={exportClasses}
                        onChange={handleSelect}
                        value={values.selection}
                    />
                )}
                <GridToolbarDensitySelector size='medium' />
                <GridToolbarExport
                    printOptions={{ disableToolbarButton: true }}
                />
            </GridToolbarContainer>
        );
    };

    const columns = [
        {
            field: 'id',
            headerName: '班級座號',
            width: 100,
            editable: true,
        },
        {
            field: 'name',
            headerName: '姓名',
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
            name: doc.name,
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
                components={{ Toolbar: CustomToolbar }}
                disableColumnFilter
                disableColumnMenu
                disableSelectionOnClick
            />
        </div>
    );
};

export default StudentTable;

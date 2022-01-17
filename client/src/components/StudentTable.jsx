import { useEffect, useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { Grid, FormControl, Typography, Button } from '@mui/material';
import { useModalContext } from '../context/ModalContext';
import { db } from '../service/firestore.js';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { exportClasses, teachers } from './Options';
import Select from './Select';
import Axios from 'axios';
import rateLimit from 'axios-rate-limit';

const columns = [
    {
        field: 'id',
        headerName: '學生Email',
        width: 200,
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
        width: 120,
    },
    {
        field: 'subTopic',
        headerName: '副主題',
        width: 120,
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
        width: 80,
    },
    {
        field: 'mem2',
        headerName: '組員2',
        width: 80,
    },
    {
        field: 'group',
        headerName: '分組',
        width: 100,
    },
];

const StudentTable = () => {
    const [values, setValues] = useState({
        selection: 0,
        selectedGroup: 201,
        group: '',
    });
    const [selected, setSelected] = useState([]);
    const { recordObj, authObj } = useModalContext();
    const [studentRecord, setRecord] = recordObj;
    const [authState] = authObj;

    const axios = rateLimit(Axios.create(), {
        maxRequests: 2,
        perMilliseconds: 1000,
        maxRPS: 2,
    });

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

    const teacher = teachers.filter((res) => {
        return res.value === values.selectedGroup;
    });

    const [object] = teacher;

    const handleUpdate = async () => {
        const data = {
            selected: selected,
            group: object.label,
        };

        await axios.patch(process.env.REACT_APP_API_URL + '/updateGroup', data);
    };

    const handleDelete = async () => {
        await axios.patch(
            process.env.REACT_APP_API_URL + '/deleteGroup',
            selected
        )
    };

    const CustomFooter = () => {
        return (
            <Grid
                container
                direction='row'
                alignItems='center'
                columnSpacing={2}
            >
                <Grid item>
                    <Typography variant='h6' sx={{ ml: 2 }}>
                        分配老師
                    </Typography>
                </Grid>
                <Grid item sm={2} xs={4}>
                    <FormControl fullWidth>
                        <Select
                            name='selectedGroup'
                            value={values.selectedGroup}
                            options={teachers}
                            onChange={handleSelect}
                            sx={{ ml: 10 }}
                        />
                    </FormControl>
                </Grid>
                <div style={{ flexGrow: 1 }} />
                <Grid item>
                    <Button
                        variant='contained'
                        sx={{ mr: 2 }}
                        disabled={false}
                        onClick={handleUpdate}
                    >
                        <Typography color='common.white'>新增</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        sx={{ mr: 2 }}
                        disabled={false}
                        onClick={handleDelete}
                    >
                        <Typography color='common.white'>刪除</Typography>
                    </Button>
                </Grid>
            </Grid>
        );
    };

    const rows = studentRecord.map((doc) => {
        return {
            id: doc.email,
            name: doc.name,
            classNumber:
                doc.class.toString() +
                (doc.number < 10
                    ? '0' + doc.number.toString()
                    : doc.number.toString()),
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
            group: doc.group,
        };
    });

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[100]}
                components={{ Toolbar: CustomToolbar, Footer: CustomFooter }}
                onSelectionModelChange={(select) => setSelected(select)}
                selectionModel={selected}
                disableColumnFilter
                disableColumnMenu
                disableSelectionOnClick
                checkboxSelection
            />
        </div>
    );
};

export default StudentTable;

import { useEffect } from 'react';
import { Container, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import StudentDashboard from './StudentDashboard';
import { useModalContext } from '../context/ModalContext';
import XLSX from 'xlsx';
import FS from 'file-saver';
import { db } from '../service/firestore.js';
import { onSnapshot, collection } from 'firebase/firestore';
import useSessionState from '../hooks/useSessionState';

const Dashboard = () => {
	const { authObj, recordObj } = useModalContext();
	const [authState] = authObj;
    const [studentRecord, setRecord] = recordObj;
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtent = '.xlsx';

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

	const docs = studentRecord.map((doc) => {
		return {
			班級: doc.class,
			座號: doc.number,
			Email: doc.email,
			主題: doc.topic,
			副主題: doc.subTopic,
			備註: doc.comment,
			組員人數: doc.memNum,
			組員1: doc.mem1Class.toString() + doc.mem1Num.toString(),
			組員2: doc.mem2Class.toString() + doc.mem2Num.toString(),
		};
	});

	const export2CSV = (APIData, fileName) => {
		const ws = XLSX.utils.json_to_sheet(APIData);
		const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
		const excelBuffer = XLSX.write(wb, {
			bookType: 'xlsx',
			type: 'array',
		});
		const data = new Blob([excelBuffer], { type: fileType });
		FS.saveAs(data, fileName + fileExtent);
	};

	const handleExport = () => {
		export2CSV(docs, 'lol');
	};

	return (
		<Container sx={{ my: 10 }}>
			<Card raised>
				<CardContent>
					<Grid container direction='column' spacing={2}>
						<Grid item>
							<Typography variant='h3' textAlign='center'>
								學生紀錄
							</Typography>
						</Grid>
						<Grid item>
							<StudentDashboard />
						</Grid>
						{authState.isAdmin && (
							<Grid item>
								<Button
									color='primary'
									variant='contained'
									onClick={handleExport}
								>
									<Typography color='common.white'>
										匯出
									</Typography>
								</Button>
							</Grid>
						)}
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Dashboard;

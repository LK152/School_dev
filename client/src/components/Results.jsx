import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { db } from '../config/firebase.config';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const Collection = collection(db, 'studentData');

const Results = (props) => {
	const [users, setUsers] = useState([]);

	const q = query(Collection, where("studentId", "==", props.id))

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(q);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getUsers();
	}, [q]);

	return (
		<Container sx={{ mt: 10 }}>
			<Card raised>
				<CardContent>
					{users.map((user) => {
						return (
							<div key={user.id}>
								<Typography>{user.studentId}</Typography>
								<Typography>{user.class}</Typography>
								<Typography>{user.number}</Typography>
								<Typography>{user.topic}</Typography>
								<Typography>{user.subTopic}</Typography>
							</div>
						);
					})}
				</CardContent>
			</Card>
		</Container>
	);
};

export default Results;

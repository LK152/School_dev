import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { db } from '../config/firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const Collection = collection(db, 'studentData');

const Results = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(Collection);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getUsers();
	}, []);

	return (
		<Container sx={{ mt: 10 }}>
			<Card raised>
				<CardContent>
					{users.map((user) => {
						return (
							<>
                                <h1>{user.class}</h1>
                                <h1>{user.number}</h1>
								<h1>{user.topic}</h1>
								<h1>{user.subTopic}</h1>
							</>
						);
					})}
				</CardContent>
			</Card>
		</Container>
	);
};

export default Results;

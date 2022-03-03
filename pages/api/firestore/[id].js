import { db } from '@src/service/AuthService';

const studentDB = db.collection('studentData');

const getDate = () => {
	const dt = new Date();
	const year = dt.getFullYear();
	const month = '0' + (dt.getMonth() + 1);
	const date = '0' + dt.getDate();
	const hours = dt.getHours();
	const minutes = dt.getMinutes();
	const seconds = dt.getSeconds();
	const output = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;

	return output;
};

// eslint-disable-next-line
export default async (req, res) => {
	const { id } = req.query;

	try {
		switch (req.method) {
			case 'POST':
				await studentDB
					.doc(id)
					.set(
						{ ...req.body, dateCreated: getDate() },
						{ merge: true }
					);
				return res.status(201).end();

			case 'DELETE':
				await studentDB.doc(id).delete();
				return res.status(200).end();
		}
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

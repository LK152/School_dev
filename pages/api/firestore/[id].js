import admin from '@utils/db';

const studentDB = admin.firestore().collection('studentData');

// eslint-disable-next-line
export default async (req, res) => {
	const { id } = req.query;

	try {
		switch (req.method) {
			case 'POST':
				await studentDB.doc(id).set({ ...req.body }, { merge: true });
				return res.status(201).end();

			case 'DELETE':
				await studentDB.doc(id).delete();
				return res.status(200).end();
		}
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

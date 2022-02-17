import admin from '../../../utils/db';

const usersDB = admin.firestore().collection('users');

// eslint-disable-next-line
export default async (req, res) => {
	const { id } = req.query;

	try {
		switch (req.method) {
			case 'POST':
				await usersDB
					.doc((await admin.auth().getUserByEmail(id)).uid)
					.set({ ...req.body });
				return res.status(201).end();

			case 'DELETE':
				await usersDB
					.doc((await admin.auth().getUserByEmail(id)).uid)
					.delete();
				return res.status(200).end();
		}
	} catch (err) {
		res.status(400).end();
	}
};

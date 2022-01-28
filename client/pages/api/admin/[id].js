import admin from '../../../utils/db';

const usersDB = admin.firestore().collection('users');

// eslint-disable-next-line
export default async (req, res) => {
	const { id } = req.query;

	try {
		switch (req.method) {
			case 'GET':
				const auth = await admin
					.firestore()
					.collection('users')
					.doc(id)
					.get();

				if (auth.exists) {
					if (auth.data().isAdmin) {
						res.status(200).json(
							(await admin.auth().listUsers()).users
						);
					} else {
						res.status(401).end();
					}
				}
				break;

			case 'POST':
				await usersDB
					.doc((await admin.auth().getUserByEmail(id)).uid)
					.set({ ...req.body });
				res.status(201).end();
				break;

			case 'DELETE':
				await usersDB
					.doc((await admin.auth().getUserByEmail(id)).uid)
					.delete();
				res.status(200).end();
				break;
		}
	} catch (err) {
		res.status(400).end();
	}
};

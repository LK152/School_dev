import admin from 'utils/db';

// eslint-disable-next-line
export default async (req, res) => {
	try {
		res.status(200).json((await admin.auth().listUsers()).users);
	} catch (err) {
		res.status(400).end();
	}
};

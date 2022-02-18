import admin from 'utils/db';

const optionsDB = admin.firestore().collection('options');

//eslint-disable-next-line
export default async (req, res) => {
	try {
        
	} catch (err) {
		res.status(400).end();
	}
};

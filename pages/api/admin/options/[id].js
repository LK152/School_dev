import admin from 'utils/db';

const FieldValue = admin.firestore.FieldValue;
const optionsDB = admin.firestore().collection('options');

//eslint-disable-next-line
export default async (req, res) => {
	const { id } = req.query;

	try {
		switch (req.method) {
			case 'POST':
				optionsDB
					.doc(id)
					.set(
						{ classes: FieldValue.arrayUnion(req.body.value) },
						{ merge: true }
					);

				return res.status(200).end();
		}
	} catch (err) {
		res.status(400).end();
	}
};

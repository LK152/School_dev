import admin from 'utils/db';

const FieldValue = admin.firestore.FieldValue;
const optionsDB = admin.firestore().collection('options').doc('option');

//eslint-disable-next-line
export default async (req, res) => {
	const { id } = req.query;

	try {
		switch (req.method) {
			case 'POST':
				switch (id) {
					case 'classes':
						await optionsDB.set(
							{ classes: FieldValue.arrayUnion(req.body.value) },
							{ merge: true }
						);
						break;

					case 'numbers':
						await optionsDB.set(
							{ numbers: FieldValue.arrayUnion(req.body.value) },
							{ merge: true }
						);
						break;

					case 'topics':
						await optionsDB.set(
							{ topics: FieldValue.arrayUnion(req.body.value) },
							{ merge: true }
						);
						break;

					case 'subTopics':
						await optionsDB.set(
							{
								subTopics: FieldValue.arrayUnion(
									req.body.value
								),
							},
							{ merge: true }
						);
						break;
				}

				return res.status(200).end();

			case 'DELETE':
				switch (id) {
					case 'classes':
						await optionsDB.set(
							{
								classes: FieldValue.arrayRemove(req.body.value),
								numbers: { [req.body.value]: null },
							},
							{ merge: true }
						);
						break;

					case 'numbers':
						await optionsDB.set(
							{
								numbers: FieldValue.arrayRemove(req.body.value),
							},
							{ merge: true }
						);

					case 'topics':
						await optionsDB.set(
							{
								topics: FieldValue.arrayRemove(req.body.value),
							},
							{ merge: true }
						);
				}

				return res.status(200).end();
		}
	} catch (err) {
		console.log(err);
		res.status(400).end();
	}
};

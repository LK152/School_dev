import admin from '@utils/db';

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
							{
								classes: FieldValue.arrayUnion(
									req.body.classes
								),
							},
							{ merge: true }
						);
						break;

					case 'numbers':
						await optionsDB.set(
							{
								numbers: FieldValue.arrayUnion(
									req.body.numbers
								),
							},
							{ merge: true }
						);
						break;

					case 'topics':
						await optionsDB.set(
							{ topics: FieldValue.arrayUnion(req.body.topics) },
							{ merge: true }
						);
						break;

					case 'subTopics':
						await optionsDB.set(
							{
								subTopics: {
									[req.body.topics]: FieldValue.arrayUnion(
										req.body.subTopics
									),
								},
							},
							{ merge: true }
						);
						break;

					case 'groups':
						await optionsDB.set(
							{
								groups: FieldValue.arrayUnion({
									location: req.body.location,
									group: req.body.group,
								}),
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
								classes: FieldValue.arrayRemove(
									req.body.classes
								),
							},
							{ merge: true }
						);
						break;

					case 'numbers':
						await optionsDB.set(
							{
								numbers: FieldValue.arrayRemove(
									req.body.numbers
								),
							},
							{ merge: true }
						);
						break;

					case 'topics':
						await optionsDB.set(
							{
								topics: FieldValue.arrayRemove(req.body.topics),
								subTopics: {
									[req.body.topics]: FieldValue.delete(),
								},
							},
							{ merge: true }
						);
						break;

					case 'subTopics':
						await optionsDB.set(
							{
								subTopics: {
									[req.body.topics]: FieldValue.arrayRemove(
										req.body.subTopics
									),
								},
							},
							{ merge: true }
						);
						break;

					case 'groups':
						await optionsDB.set(
							{
								groups: FieldValue.arrayRemove({
									location: req.body.location,
									group: req.body.group,
								}),
							},
							{ merge: true }
						);
						break;
				}

				return res.status(200).end();
		}
	} catch (err) {
		console.log(err);
		res.status(400).end();
	}
};

import admin from '../../../../utils/db';

// eslint-disable-next-line
export default async (req, res) => {
	try {
		const batch = admin.firestore().batch();

		switch (req.method) {
			case 'PATCH':
				if (
					Array.isArray(req.body.selected) &&
					req.body.selected.length <= 100
				) {
					await req.body.selected.forEach((id) => {
						admin
							.firestore()
							.collection('studentData')
							.doc(id)
							.update({
								group: req.body.group,
								groupClass: req.body.groupClass,
							});
					});

					return res.status(201).end();
				} else {
					return res.status(406);
				}

			case 'POST':
				if (Array.isArray(req.body) && req.body.length <= 100) {
					await req.body.forEach((id) => {
						admin
							.firestore()
							.collection('studentData')
							.doc(id)
							.update({ group: '', groupClass: '' })
							.then(() => res.status(200).end())
							.catch(() => res.status(400).end());
					});

					res.status(200).end();
				} else {
					res.status(406).end();
				}
		}
	} catch (err) {
		res.status(400).end();
	}
};

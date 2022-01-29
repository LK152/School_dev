import admin from '../../../../utils/db';

// eslint-disable-next-line
export default async (req, res) => {
	try {
		switch (req.method) {
			case 'PATCH':
				if (
					Array.isArray(req.body.selected) &&
					req.body.selected.length <= 100
				) {
					req.body.selected.forEach((id) => {
						admin
							.auth()
							.getUserByEmail(id)
							.then((user) => {
								admin
									.firestore()
									.collection('studentData')
									.doc(user.uid)
									.update({ group: req.body.group, groupClass: req.body.groupClass });
							})
							.catch(() =>
								res
									.status(404)
									.json({ error: 'user not found' })
							);
					});

					res.status(201).end();
				} else {
					res.sendStatus(406);
				}
				break;

			case 'POST':
				if (Array.isArray(req.body) && req.body.length <= 100) {
					req.body.forEach((id) => {
						admin
							.auth()
							.getUserByEmail(id)
							.then((user) => {
								admin
									.firestore()
									.collection('studentData')
									.doc(user.uid)
									.update({ group: '', groupClass: '' })
									.then(() => res.status(200).end())
									.catch(() => res.status(400).end());
							})
							.catch(() =>
								res
									.status(404)
									.json({ error: 'user not found' })
							);
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

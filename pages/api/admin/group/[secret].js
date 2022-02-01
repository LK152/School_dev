import admin from '../../../../utils/db';

// eslint-disable-next-line
export default async (req, res) => {
	const { secret } = req.query;

	if (secret !== process.env.API_ROUTE_KEY) {
		return res.status(401).end();
	}
	try {
		switch (req.method) {
			case 'PATCH':
				req.body.selected.forEach((id) => {
					admin
						.auth()
						.getUserByEmail(id)
						.then((user) => {
							admin
								.firestore()
								.collection('studentData')
								.doc(user.uid)
								.set({ ...req.body.data }, { merge: true });
						})
						.catch(() => {
							return res
								.status(404)
								.json({ error: 'user not found' });
						});
				});

				return res.status(201).end();

			case 'POST':
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
						.catch(() => {
							return res
								.status(404)
								.json({ error: 'user not found' });
						});
				});

				return res.status(200).end();
		}
	} catch (err) {
		res.status(400).end();
	}
};

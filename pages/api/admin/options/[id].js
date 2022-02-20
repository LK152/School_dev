import admin from 'utils/db';

const optionsDB = admin.database();
const ref = optionsDB.ref('options');

//eslint-disable-next-line
export default async (req, res) => {
	const { id } = req.query;

	try {
		switch (req.method) {
			case 'POST':
				ref.child(id).push({ [req.body]: req.body });

				return res.status(201).end();
		}
	} catch (err) {
        console.log(err)
		res.status(400).end();
	}
};

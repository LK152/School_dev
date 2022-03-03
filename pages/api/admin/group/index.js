import { db } from '@src/service/AuthService'
import initMiddleware from '@src/lib/initMiddleware';
import validateMiddleware from '@src/lib/validateMiddleware';
import { body, validationResult } from 'express-validator';

const validateAdd = initMiddleware(
	validateMiddleware(
		[body('selected').isLength({ min: 1, max: 100 })],
		validationResult
	)
);

const validateDelete = initMiddleware(
	validateMiddleware(
		[body().isLength({ min: 1, max: 100 })],
		validationResult
	)
);

// eslint-disable-next-line
export default async (req, res) => {
	const errors = validationResult(req);

	try {
		switch (req.method) {
			case 'PATCH':
				const updateBatch = db.batch();

				await validateAdd(req, res);

				if (!errors.isEmpty()) {
					return res.status(422).json({ errors: errors.array() });
				}

				await req.body.selected.forEach((id) => {
					updateBatch.update(db.collection('studentData').doc(id), {
						group: req.body.group,
						groupLocation: req.body.groupLocation,
					});
				});

				await updateBatch.commit();

				return res.status(201).end();

			case 'POST':
				const deleteBatch = db.batch();
				await validateDelete(req, res);

				if (!errors.isEmpty()) {
					return res.status(422).json({ errors: errors.array() });
				}

				await req.body.forEach((id) => {
					deleteBatch.update(db.collection('studentData').doc(id), {
						group: '',
						groupLocation: '',
					});
				});
				await deleteBatch.commit();

				res.status(200).end();
		}
	} catch (err) {
		res.status(400).end();
	}
};

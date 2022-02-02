import admin from '../../../../utils/db';
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
				await validateAdd(req, res);

				if (!errors.isEmpty()) {
					return res.status(422).json({ errors: errors.array() });
				}
				await req.body.selected.forEach((id) => {
					admin.firestore().collection('studentData').doc(id).update({
						group: req.body.group,
						groupClass: req.body.groupClass,
					});
				});

				return res.status(201).end();

			case 'POST':
				await validateDelete(req, res);

				if (!errors.isEmpty()) {
					return res.status(422).json({ errors: errors.array() });
				}

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
		}
	} catch (err) {
		res.status(400).end();
	}
};

import admin from '@utils/db';

const deleteCollection = async () => {
	const collectionRef = admin.firestore().collection('studentData');
	const query = collectionRef.orderBy('__name__');

	return new Promise((resolve, reject) => {
		deleteQueryBatch(query, resolve).catch(reject);
	});
};

const deleteQueryBatch = async (query, resolve) => {
	const snapshot = await query.get();

	const batchSize = snapshot.size;
	if (batchSize === 0) {
		resolve();
		return;
	}

	const batch = db.batch();
	snapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});
	await batch.commit();

	process.nextTick(() => {
		deleteQueryBatch(query, resolve);
	});
};

//eslint-disable-next-line
export default async (req, res) => {
	try {
        await deleteCollection();

        res.status(200).end();
	} catch (err) {
		res.status(400).json(err);
	}
};

import admin from 'utils/db';

const optionsDB = admin.firestore().collection('options');

//eslint-disable-next-line
export default async (req, res) => {
    const { id } = req.query;

	try {
        switch (req.method) {
            case 'POST': 
                await optionsDB.doc(id)
        }
	} catch (err) {
        res.status(400).end();
    }
};

import admin from '../../../utils/db';

const studentDB = admin.firestore().collection('studentData');

// eslint-disable-next-line
export default async (req, res) => {
    const { id } = req.query;

    try {
        switch (req.method) {
            case 'POST': 
                await studentDB.doc(id).set({ ...req.body });
                res.status(201).end();
                break;
            
            case 'DELETE': 
                await studentDB.doc(id).delete();
                res.status(200).end();
                break;
        }   
    } catch (err) {
        res.status(400).end();
    }
}
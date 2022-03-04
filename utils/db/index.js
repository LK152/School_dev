import admin from 'firebase-admin';
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
	try {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		});
	} catch (err) {
		console.log('Firebase init error', err.stack);
	}
}

export default admin;

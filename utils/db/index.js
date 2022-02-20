import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
	try {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://lssh-self-learning-default-rtdb.firebaseio.com'
		});
	} catch (err) {
		console.log('Firebase init error', err.stack);
	}
}

export default admin;

import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import { getAnalytics } from 'firebase/analytics';
import {
	enableMultiTabIndexedDbPersistence,
	getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASURE_ID,
};

export const app = initializeApp(firebaseConfig);

if (app.name && typeof window !== 'undefined') {
	const perf = getPerformance(app);
	const analy = getAnalytics(app);

	enableMultiTabIndexedDbPersistence(getFirestore(app)).catch((err) => {
		if (err.code == 'failed-precondition') {
			console.log(
				'Multiple tabs open, persistence can only be enabled in one tab at a a time.'
			);
		} else if (err.code == 'unimplemented') {
			console.log(
				'The current browser does not support all of thefeatures required to enable persistence'
			);
		}
	});
}

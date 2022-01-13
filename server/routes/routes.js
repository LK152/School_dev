const express = require('express');
const router = express.Router();
const admin = require('../conn');
const auth = admin.auth();
const studentDB = admin.firestore().collection('studentData');
const userDB = admin.firestore().collection('userData');

router.route('/').get((req, res) => {
	res.status(200).send('API Deployed Successful');
});

router.route('/setDoc/:id').post((req, res) => {
	studentDB
		.doc(req.params.id)
		.set(req.body)
		.then(() => res.sendStatus(201))
		.catch(() => res.sendStatus(400));
});

router.route('/updateDoc/:id').post((req, res) => {
	studentDB
		.doc(req.params.id)
		.update(req.body)
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(400));
});

router.route('/deleteDoc/:id').delete((req, res) => {
	studentDB
		.doc(req.params.id)
		.delete()
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(405));
});

router.route('/addUser/:id').post((req, res) => {
	auth.getUserByEmail(req.params.id).then((user) => {
		userDB
			.doc(user.uid)
			.set(req.body)
			.then(() => res.sendStatus(201))
			.catch(() => res.sendStatus(400));
	}).catch(() => res.sendStatus(404))
});

router.route('/deleteUser/:id').delete((req, res) => {
	userDB
		.doc(req.params.id)
		.delete()
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(405));
});

module.exports = router;

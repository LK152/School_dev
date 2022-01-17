const express = require('express');
const router = express.Router();
const admin = require('../conn');
const auth = admin.auth();
const studentDB = admin.firestore().collection('studentData');
const userDB = admin.firestore().collection('users');

router.route('/').get((req, res) => {
    res.status(200).send('API Deployed Successfully');
});

router.route('/setDoc/:id').post((req, res) => {
    studentDB
        .doc(req.params.id)
        .set(req.body)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400));
});

router.route('/updateDoc/:id').patch((req, res) => {
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
    auth.getUserByEmail(req.params.id)
        .then((user) => {
            const userInfo = {
                email: user.email,
                isAdmin: req.body.isAdmin,
                userClass: req.body.userClass,
                uid: user.uid,
            };

            userDB
                .doc(user.uid)
                .set(userInfo)
                .then(() => res.sendStatus(201))
                .catch(() => res.sendStatus(400));
        })
        .catch(() => res.status(404).json({ error: 'user not found' }));
});

router.route('/updateUser/:id').patch((req, res) => {
    auth.getUserByEmail(req.params.id)
        .then((user) => {
            userDB
                .doc(user.uid)
                .update(req.body)
                .then(() => res.sendStatus(200))
                .catch(() => res.sendStatus(400));
        })
        .catch(() => res.status(404).json({ error: 'user not found' }));
});

router.route('/deleteUser/:id').delete((req, res) => {
    auth.getUserByEmail(req.params.id)
        .then((user) => {
            userDB
                .doc(user.uid)
                .delete()
                .then(() => res.sendStatus(200))
                .catch(() => res.sendStatus(400));
        })
        .catch(() => res.status(404).json({ error: 'user not found' }));
});

router.route('/updateGroup/').patch((req, res) => {
    for (var i = 0; i < req.body.selected.length; i++) {
        auth.getUserByEmail(req.body.selected[i])
            .then((user) => {
                studentDB
                    .doc(user.uid)
                    .set({ group: req.body.group }, { merge: true })
            })
            .catch(() => res.status(404).json({ error: 'user not found' }));
    }
});

router.route('/deleteGroup').patch((req, res) => {
    for (var i = 0; i < req.body.length; i++) {
        auth.getUserByEmail(req.body[i])
            .then((user) => {
                studentDB
                    .doc(user.uid)
                    .update({ group: '' })
            })
            .catch(() => res.status(404).json({ error: 'user not found' }));
    }
});

module.exports = router;

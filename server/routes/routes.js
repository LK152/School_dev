const express = require('express');
const router = express.Router();
const admin = require('../conn');
const auth = admin.auth();
const studentDB = admin.firestore().collection('studentData');
const userDB = admin.firestore().collection('userData');

router.route('/getDoc/:id').get((req, res) => {
    const unSub = studentDB.doc(req.params.id).onSnapshot((snap) => {
        if (snap.exists) {
            res.json(snap.data());
            unSub();
        } else {
            res.send('404');
        }
    });
});

router.route('/setDoc/:id').post((req, res) => {
    const data = {
        uid: req.body.uid,
        class: req.body.class,
        number: req.body.number,
        topic: req.body.topic,
        topicLabel: req.body.topicLabel,
        subTopic: req.body.subTopic,
        subTopicLabel: req.body.subTopicLabel,
        memNum: req.body.memNum,
        mem1Class: req.body.mem1Class,
        mem1Num: req.body.mem1Num,
        mem2Class: req.body.mem2Class,
        mem2Num: req.body.mem2Num,
    };

    studentDB
        .doc(req.params.id)
        .set(data)
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

router.route('/getUsers').get((req, res) => {
    userDB.onSnapshot((snap) => {
        const users = [];

        snap.forEach((doc) => {
            if (doc.exists) {
                users.push(doc.data());
            }
        });

        res.json(users);
    });
});

router.route('/addUser/:id').post((req, res) => {
    const data = {
        email: req.body.email,
        userClass: req.body.userClass,
        isAdmin: req.body.isAdmin,
    };

    userDB
        .doc(req.params.id)
        .set(data)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400));
});

router.route('/deleteUser/:id').delete((req, res) => {
    userDB
        .doc(req.params.id)
        .delete()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(405));
});

module.exports = router;

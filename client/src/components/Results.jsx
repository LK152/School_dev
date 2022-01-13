import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    IconButton,
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';
import { useModalContext } from '../context/ModalContext';
import { db } from '../service/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';

const Results = () => {
    const [empty, setEmpty] = useState(false);
    const [open, setOpen] = useState(false);
    const { documentObj, infoObj } = useModalContext();
    const [document, setDoc] = documentObj;
    const [info] = infoObj;

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, 'studentData', info.uid),
            (snapshot) => {
                if (snapshot.exists()) {
                    setDoc(snapshot.data());
                } else {
                    setEmpty(true);
                }
            }
        );

        return () => unSub();
    }, [info.uid, setDoc]);

    const renderMember = (num, doc) => {
        const fields = [];
        for (var i = 1; i < num; i++) {
            fields.push(
                <Grid container item direction="row" key={i}>
                    <Grid item xs={6}>
                        <Typography variant="h5" align="center">
                            {'組員' + i}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" align="center">
                            {i === 1 ? doc.mem1Class : doc.mem2Class}
                            {i === 1 ? doc.mem1Num : doc.mem2Num}
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        return <>{fields}</>;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await axios.delete(
            'https://school-server-2022.herokuapp.com/deleteDoc/' + info.uid
        );

        setEmpty(true);
        setOpen(false);
    };

    return (
        <Container sx={{ my: 10 }}>
            <Card raised>
                <CardContent>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center" mb={4}>
                            自主學習紀錄
                        </Typography>
                    </Grid>
                    {empty === false ? (
                        <Grid container direction="column" spacing={4}>
                            <Grid container item direction="row">
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        班級座號
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        {document.class}
                                        {document.number}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item direction="row">
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        主題
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        {document.topicLabel}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item direction="row">
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        副主題
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        {document.subTopicLabel}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {document.comment !== '' && (
                                <Grid container item direction="row">
                                    <Grid item xs={6}>
                                        <Typography variant="h5" align="center">
                                            備註
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5" align="center">
                                            {document.comment}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                            <Grid container item direction="row">
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        組員人數
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center">
                                        {document.memNum}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {renderMember(document.memNum, document)}
                            <Grid
                                container
                                item
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <IconButton onClick={handleClickOpen}>
                                        <DeleteForever />
                                    </IconButton>
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>確定刪除?</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleClose}>
                                                否
                                            </Button>
                                            <Button
                                                onClick={handleDelete}
                                                autoFocus
                                            >
                                                是
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        component={Link}
                                        to="/self-learning-edit"
                                    >
                                        <Edit />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="h1" align="center">
                                無表單紀錄
                            </Typography>
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Results;

import { useState, useEffect } from 'react';
import {
    IconButton,
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
} from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';
import { db } from '../service/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import CellEditServerSidePersistence from './Test_edit'

const back = () => {
    return (
        <Container>
            <CellEditServerSidePersistence ></CellEditServerSidePersistence>
        </Container>
    );
};

export default back;

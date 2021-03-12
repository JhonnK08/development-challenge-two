import React from 'react';
import {Button, Grid, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import CreatePatient from './CreatePatient'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PatientsFunction from './PatientsFunction';

const useStyles = makeStyles({
  });

export default function App() {
    const classes = useStyles();
    return (
        <Grid>
        <Grid item>
            <Header/>
        </Grid>
        <Grid item container>
            <Grid item xs={false} sm={2}/>
            <Grid item xs={12} sm={8}>
                <PatientsFunction />
            </Grid>
            <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item>
            <Footer/>
        </Grid>
    </Grid>
  );
}
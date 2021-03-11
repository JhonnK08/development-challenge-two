import { Paper, Typography, makeStyles} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  Paper: {
    flex: 1,
    width: '100%',
    bottom: 0,
    position: 'fixed',
    backgroundColor: '#009adf',
    padding: 10
  },
  Typography: {
    color: '#fff',
  }
}));

export default function Footer() {
  const classes = useStyles();
    return (
        <Paper className={classes.Paper}>
        <Typography className={classes.Typography} variant="h6" align="center">Jhonatan Konopp - 2021</Typography>
      </Paper>
    )
}
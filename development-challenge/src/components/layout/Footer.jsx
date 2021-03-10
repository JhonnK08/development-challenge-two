import { Paper, Tabs, Tab, Typography } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'


export default function Footer() {
    return (
        <Paper style={{bottom: 0, position: 'fixed'}}>
        <Typography variant="h6" align="center" color="primary">Jhonatan Konopp - 2021</Typography>
      </Paper>
    )
}
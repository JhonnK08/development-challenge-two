import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'


export default class About extends Component {
  
  render() {
  const { setOpenAbout } = this.props
  return (
    <Dialog
        open
        onClose={()=> {setOpenAbout(false)}}>
        <DialogTitle id="alert-dialog-title" align="center">{"Sobre"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
          Development Challenge Two - Medcloud
          <br />
          Made by Jhonatan - 2021
          </DialogContentText>
        </DialogContent>
    </Dialog>
  );
}
}
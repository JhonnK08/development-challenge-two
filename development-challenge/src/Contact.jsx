import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography } from '@material-ui/core'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';


export default class Contact extends Component {
  render() {
  const { setOpenContact } = this.props

  return (
    <Dialog
        open
        onClose={()=> {setOpenContact(false)}}>
        <DialogTitle id="alert-dialog-title" align="center">{"Contato"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="body1" gutterBottom><a href="mailto: jhonnkonopp@gmail.com"><MailIcon/>Email</a> </Typography><br />
          <Typography variant="body1" gutterBottom><a href="https://linkedin.com/in/jhonatan-konopp"><LinkedInIcon/>LinkedIn</a></Typography> <br />
          <Typography variant="body1" gutterBottom><a href="https://www.instagram.com/jhonnkonopp/"><InstagramIcon/>Instagram</a> </Typography><br />
          </DialogContentText>
        </DialogContent>
    </Dialog>
  );
}
}
import React, {Component, Fragment} from 'react'
import {Box, Grid, Typography, Paper, TextField, Button} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddIcon } from '@material-ui/icons/Add';

const style = {
    Paper: { padding: 20, marginTop: 20, marginBottom:20}
}

export default class Patient extends Component {
    state = {
        open: false
    }

    handleToogle = () => {
        this.setState({
            open: this.state.open
        })
    }
    
    render() {
    const { open } = this.state

    return <Fragment>
        <Button variant="fab" onClick={this.handleToogle} mini>
            <AddIcon/>
      </Button>
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cadastro de Paciente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os dados abaixo:
          </DialogContentText>
          <form>

          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>         
        </Fragment>

        
    }
}
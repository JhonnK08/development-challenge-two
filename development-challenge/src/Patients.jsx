import React, { useState } from 'react';
import axios from 'axios';
import { Component, useEffect } from 'react';
import {Paper, Table, TableBody, TableRow, TableHead, TableCell, TableContainer, Fade, Tooltip, withStyles, Button} from '@material-ui/core';
import {Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Snackbar} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import CreatePatient from './CreatePatient';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
  TableCell: {
    fontWeight: 'bolder'
  }
})


export default withStyles(styles)(class Patients extends Component {

  state = {
    newPatient: null,
    patients: [],
    openRemove: false,
    openRemoveSuccess: false,
    removeId: null,
  }

  handleToggle = () => {
    this.setState({
        openRemove: !this.state.openRemove
    })
  }

  handleRemoveSnackbar = () => {
    this.setState({
      openRemoveSucess: !this.state.openRemoveSucess
    })
  }

 

  fetchPatients = async () => {
    try {
      const res = await axios.get('/patients');
      this.setState({ patients: res.data.Items })
      /* 
      console.log(res.data.Items.length)
      console.log(res.data)
      const response = await fetch('/patients');
      const body = await response.json();
      this.setState({patients: response.data})*/
    } catch (err) {
      console.log(err);
    }

  }

  componentDidMount = () => {
    this.fetchPatients();
  }

  useEffect = () => {
    this.remove()
  }

  getIDTable(id) {
    console.log(id)
    this.setState({...this.state, removeId: id})
  }


  removePatient = async (id) => {
    const id2 = this.state.removeId
    const params = {
      "id" : this.state.removeId
    }
    console.log(params)
    console.log(this.state.removeId)
    console.log(id)
    try {
      const res = await axios.delete(`/patients/{id}`, params).then(this.setState({ openRemoveSucess: true }));
      window.location.reload();
      console.log(res.data)
      /*
      console.log(res.data.Items.length)
      const response = await fetch('/patients');
      const body = await response.json();
      this.setState({patients: response.data})
      */
    } catch (err) {
      console.log(err);
    }
  }
  

  

  render() {
    const allPatients = this.state.patients;
    const { classes } = this.props;
    const {openRemove, openRemoveSucess} = this.state;
    return (
      <div>
        <Paper style={{ margin: 20 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.TableCell}>Nome Completo</TableCell>
                  <TableCell className={classes.TableCell}>CPF</TableCell>
                  <TableCell className={classes.TableCell}>Data de Nascimento</TableCell>
                  <TableCell className={classes.TableCell}>Sexo</TableCell>
                  <TableCell className={classes.TableCell} colSpan="1" align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allPatients.map((body) => (
                  <TableRow key={body.id}>
                    <TableCell component="th" scope="row" >{body.nome}</TableCell>
                    <TableCell >{body.cpf}</TableCell>
                    {/* 
                    <TableCell >
                      {body.id}
                    </TableCell>
                    <TableCell >{body.Endereço}</TableCell>
                     */}
                    <TableCell >{body.dataNasc}</TableCell>
                    <TableCell >{body.sexo}</TableCell>
                    <TableCell align="center">
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Editar">
                        <IconButton onClick={this.remove}>
                          <EditIcon></EditIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Excluir">
                      <IconButton onClick={this.handleToggle}>
                        <DeleteIcon/>
                      </IconButton>
                      </Tooltip>
                      {/* <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Ver Mais">
                      <IconButton >
                        <SearchIcon />
                      </IconButton>
                      </Tooltip> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog
        open={openRemove}
        onClose={this.handleToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Remover Paciente"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja excluir este paciente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            Não
          </Button>
          <Button onClick={this.removePatient} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={this.state.openRemoveSucess} autoHideDuration={3000} onClose={this.handleRemoveSnackbar}>
        <Alert severity="success" onClose={this.handleRemoveSnackbar}>
            Paciente deletado com sucesso!
        </Alert>
      </Snackbar>

      <CreatePatient/>
      </div >
    )
  }
})
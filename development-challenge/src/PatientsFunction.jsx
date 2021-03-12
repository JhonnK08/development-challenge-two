import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Paper, Table, TableBody, TableRow, TableHead, TableCell, TableContainer, Fade, Tooltip, Button } from '@material-ui/core';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Snackbar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import CreatePatient from './CreatePatient';
import EditPatient from './EditPatient'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PatientsFunction = () => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [remove, setRemove] = useState('')
  const [edit, setEdit] = useState('')
  const [openSucess, setOpenSucess] = useState(false)
  const [openEditSuccess, setOpenEditSuccess] = useState(false)
  const [allPatients, setAllPatients] = useState([]) 
  useEffect (() => {fetchPatients()}, [])

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleRemoveSnackbar = () => {
    setOpenSucess(!openSucess)
  }

  const fetchPatients = async () => {
    try {
      const res = await axios.get('/patients');
      setAllPatients(res.data.Items)
      /* 
      console.log(res.data)
      console.log(res.data.Items.length)
      const response = await fetch('/patients');
      const body = await response.json();
      this.setState({patients: response.data})*/
    } catch (err) {
      console.log(err);
    }
  }

  const removePatient = async () => {
    try {
      const res = await axios.delete(`/patients/${remove.id}`)
      if (res){
        setOpenSucess(true)
        handleToggle()
        setAllPatients(allPatients.filter( e => e.id !== remove.id))
      }
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  const editPatient = (patient) => {
    setAllPatients(allPatients.map(e => {
      if(e.id === patient.id)
        return patient
      else
        return e
    }))
  }

  const addPatient = (patient) => {
    console.log(patient)
    console.log(allPatients)
    const newPatient = allPatients
    newPatient.push(patient)
    console.log(newPatient)
    setAllPatients(newPatient)
  }



  return (
    <div>
      <Paper style={{ margin: 20 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome Completo</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell colSpan="1" align="center">Ações</TableCell>
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
                      <IconButton onClick={() => {
                        setEdit(body);
                        setOpenEdit(true);
                      }}>
                        <EditIcon></EditIcon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Excluir">
                      <IconButton onClick={() => {
                        setRemove(body);
                        handleToggle()
                      }}>
                        <DeleteIcon />
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
        open={open}
        onClose={handleToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Remover paciente ${remove.nome}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Você tem certeza que deseja excluir o paciente?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} color="primary">
            Não
          </Button>
          <Button onClick={removePatient} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar open={openSucess} autoHideDuration={3000} onClose={handleRemoveSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity="success" onClose={handleRemoveSnackbar}>
          Paciente deletado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar open={openEditSuccess} autoHideDuration={3000}>
                <Alert severity="success">
                    Paciente editado com sucesso!
            </Alert>
            </Snackbar>

      <CreatePatient addPatient={addPatient}  />
      {openEdit && <EditPatient patient={edit} setOpenEdit={setOpenEdit} editPatient={editPatient}  setOpenEditSuccess={setOpenEditSuccess} />} 

    </div >
  )
}


export default PatientsFunction

import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import { Button, TextField, Paper, Table, TableBody, TableRow, TableHead, TableCell, TableContainer } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';


export default class Patients extends Component {

  state = {
    newPatient: null,
    patients: []
  }

  fetchPatients = async () => {
    try {
      const res = await axios.get('/patients');
      this.setState({ patients: res.data.Items })
      console.log(res.data)
      /* const response = await fetch('/patients');
      const body = await response.json();
      this.setState({patients: response.data})*/
    } catch (err) {
      console.log(err);
    }

  }

  componentDidMount = () => {
    this.fetchPatients();
  }

  remove(id) {
    let updatePatient = [...this.state.invoices].filter(i => i.id !== id);
    this.setState({ invoices: updatePatient })
  }

  render() {
    const allPatients = this.state.patients;
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
                    <TableCell >{body.CPF}</TableCell>
                    {/* 
                    <TableCell >
                      {body.id}
                    </TableCell>
                    <TableCell >{body.Endereço}</TableCell>
                     */}
                    <TableCell >{body.dataNasc}</TableCell>
                    <TableCell >{body.sexo}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => this.remove(body.id)}>
                        <EditIcon></EditIcon>
                      </IconButton>
                      <IconButton >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton >
                        <SearchIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div >
    )
  }
}
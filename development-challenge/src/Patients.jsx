import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import {Paper, Table, TableBody, TableRow, TableHead, TableCell, TableContainer, Fade, Tooltip, withStyles} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  TableCell: {
    fontWeight: 'bolder'
  }
})

export default withStyles(styles)(class Patients extends Component {

  state = {
    newPatient: null,
    patients: []
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

  remove(id) {
    let updatePatient = [...this.state.invoices].filter(i => i.id !== id);
    this.setState({ invoices: updatePatient })
  }

  render() {
    const allPatients = this.state.patients;
    const { classes } = this.props;
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
                        <IconButton onClick={() => this.remove(body.id)}>
                          <EditIcon></EditIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Excluir">
                      <IconButton >
                        <DeleteIcon />
                      </IconButton>
                      </Tooltip>
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Ver Mais">
                      <IconButton >
                        <SearchIcon />
                      </IconButton>
                      </Tooltip>
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
})
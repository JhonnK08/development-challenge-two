import React from 'react'
import { Fragment, Component } from 'react'
import { Dialog, Button, TextField, Select, InputLabel, FormControl, withStyles} from '@material-ui/core/';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const styles = theme => ({
    FormControl: {
        width: '30rem',
        margin: 20
    },
    FormControlNumbers: {
        width: '13rem',
        margin: 20
    },
    Select: {
        width: '13rem',
        margin: 20
    },
})

export default withStyles(styles)(class CreatePatient extends Component {
    state = {
        patient: this.props.patient,
    }

    handleChange = nome => ({ target: { value } }) => {
        this.setState({
            patient: {
                ...this.state.patient,
                [nome]: value,
            }
        })
    }

    handleSubmit = async () => {
        const params = {
            "id": this.props.patient.id,
            "nome": this.state.patient.nome,
            "cpf": this.state.patient.cpf,
            "endereco": this.state.patient.endereco,
            "cep": this.state.patient.cep,
            "telefone": this.state.patient.telefone,
            "email": this.state.patient.email,
            "dataNasc": this.state.patient.dataNasc,
            "sexo": this.state.patient.sexo,
            "obs": this.state.patient.obs,
        }
        try {
            console.log(params)
            await axios.put(`/patients/{id}`, params);
            this.setState({open: true})
            this.props.setOpenEdit(false)
            this.props.editPatient(params)
            this.props.setOpenEditSuccess(true)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { classes, patient, setOpenEdit } = this.props
        return (
        <Fragment>
            <Dialog open onClose={()=> {setOpenEdit(false)}}>
                <DialogTitle> {`Editar Paciente ${patient.nome}`} </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Paciente {patient.nome}
                </DialogContentText>
                    <form onSubmit={event => this.handleSubmit()}>
                        <TextField className={classes.FormControl} id="nome" label="Nome Completo" value={this.state.patient.nome} onChange={this.handleChange('nome')} margin="normal" disabled />
                        <TextField className={classes.FormControlNumbers} id="cpf" label="CPF" value={this.state.patient.cpf} onChange={this.handleChange('cpf')} margin="normal" disabled />
                        <TextField className={classes.FormControlNumbers} id="telefone" label="Telefone" value={this.state.patient.telefone} onChange={this.handleChange('telefone')} margin="normal" />
                        <TextField className={classes.FormControl} id="email" label="Email" value={this.state.patient.email} onChange={this.handleChange('email')} type="email" margin="normal" />
                        <TextField className={classes.FormControlNumbers} id="dataNasc" label="Data de Nascimento" value={this.state.patient.dataNasc} onChange={this.handleChange('dataNasc')} type="date" margin="normal" InputLabelProps={{ shrink: true }} />
                        <FormControl className={classes.Select}>
                            <InputLabel shrink id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                native
                                value={this.state.patient.sexo}
                                onChange={this.handleChange('sexo')}>
                                <option value='F'>Feminino</option>
                                <option value='M'>Masculino</option>
                                <option value='N'>Prefiro Não Dizer</option>
                            </Select>
                        </FormControl>
                        <TextField className={classes.FormControl} id="endereco" label="Endereço" value={this.state.patient.endereco} onChange={this.handleChange('endereco')} margin="normal" />
                        <TextField className={classes.FormControlNumbers} id="cep" label="CEP" value={this.state.patient.cep} onChange={this.handleChange('cep')} margin="normal" />
                        <TextField className={classes.FormControl} id="obs" label="Observações" value={this.state.patient.obs} onChange={this.handleChange('obs')} margin="normal" multiline rows="3" />
                    </form>
                </DialogContent>
                <DialogActions>
                        <Button color="primary" align="center" variant="contained" onClick={this.handleSubmit}>
                            Adicionar
                        </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
        )
    }
})
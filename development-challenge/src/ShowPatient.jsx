import React from 'react'
import { Fragment, Component } from 'react'
import { Dialog, Button, Fab, TextField, Select, InputLabel, FormControl, Snackbar, withStyles, Tooltip, Fade } from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    Fab: {
        position: 'relative',
        marginTop: theme.spacing(3),
    }

})

export default withStyles(styles)(class CreatePatient extends Component {
    state = {
        open: false,
        patient: {
            id: "",
            nome: "",
            cpf: "",
            endereco: "",
            cep: "",
            telefone: "",
            email: "",
            dataNasc: "",
            sexo: "",
            obs: ""
        },
        patients: [],
        newPatient: null,
        lastId: null
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleToogleSnackbar = () => {
        this.setState({
            openSucess: !this.state.openSucess
        })
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
            "id": this.state.lastId,
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
            await axios.get(`/patients/{id}`, params);
            this.setState({ patients: res.data})
            this.setState({
                patient: {
                    id: res.data.id,
                    nome: res.data.nome,
                    cpf: res.data.cpf,
                    endereco: res.data.endereco,
                    cep: res.data.cep,
                    telefone: res.data.telefone,
                    email: res.data.email,
                    dataNasc: { selectedValue: res.data.dataNasc },
                    sexo: { selected: res.data.sexo },
                    obs: res.data.obs
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { open, patient: { id, nome, cpf, endereco, cep, telefone, email, dataNasc, sexo, obs } } = this.state,
            { classes } = this.props
        return (
        <Fragment>
            <Dialog open={open} onClose={this.handleToggle}>
                <DialogTitle id="form-dialog-title">Paciente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                </DialogContentText>
                        <TextField className={classes.FormControl} id="nome" label="Nome Completo" value={nome} margin="normal" disabled />
                        <TextField className={classes.FormControlNumbers} id="cpf" label="CPF" value={cpf} type="number" margin="normal" disabled />
                        <TextField className={classes.FormControlNumbers} id="telefone" label="Telefone" value={telefone} type="number" margin="normal" disabled/>
                        <TextField className={classes.FormControl} id="email" label="Email" value={email} type="email" margin="normal" />
                        <TextField className={classes.FormControlNumbers} id="dataNasc" label="Data de Nascimento" value={dataNasc} type="date" margin="normal" InputLabelProps={{ shrink: true }} disabled/>
                        <FormControl className={classes.Select}>
                            <InputLabel shrink id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                native
                                value={sexo}>
                                <option value='F'>Feminino</option>
                                <option value='M'>Masculino</option>
                                <option value='N'>Prefiro Não Dizer</option>
                            </Select>
                        </FormControl>
                        <TextField className={classes.FormControl} id="endereco" label="Endereço" value={endereco} margin="normal" disabled/>
                        <TextField className={classes.FormControlNumbers} id="cep" label="CEP" value={cep} type="number" margin="normal" disabled/>
                        <TextField className={classes.FormControl} id="obs" label="Observações" value={obs} margin="normal" multiline rows="3" disabled/>
                </DialogContent>
                <DialogActions>
                        <Button color="primary" align="center" variant="contained" onClick={this.handleSubmit}>
                            OK
                        </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
        )
    }
})
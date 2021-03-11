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
        position: "fixed", 
        bottom: 60, 
        right: 20
    }

})

export default withStyles(styles)(class CreatePatient extends Component {
    state = {
        open: false,
        openSucess: false,
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

    fetchPatients = async () => {
        try {
            const res = await axios.get('/patients');
            this.setState({ patients: res.data.Items })
            this.setState({ lastId: res.data.Items.length + 1 })
            /* const response = await fetch('/patients');
            console.log(this.state.lastId)
            const body = await response.json();
            this.setState({patients: response.data})*/
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = () => {
        this.fetchPatients();
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
            await axios.post(`/patients/{id}`, params).then(() => this.setState({ openSucess: true }));
            this.setState({ patients: [...this.state.patients, this.state.patient] })
            this.setState({
                patient: {
                    id: "",
                    nome: "",
                    cpf: "",
                    endereco: "",
                    cep: "",
                    telefone: "",
                    email: "",
                    dataNasc: { selectedValue: '' },
                    sexo: { selected: '' },
                    obs: ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { open, openSucess, patient: { id, nome, cpf, endereco, cep, telefone, email, dataNasc, sexo, obs } } = this.state,
            { classes } = this.props
        return (
        <Fragment>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 700 }} title="Adicionar Paciente">
                <Fab color="primary" onClick={this.handleToggle} className={classes.Fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            {/* <Button variant="fab" onClick={this.handleToggle} mini color="inherit">
                <AddIcon />
            </Button> */}
            <Dialog open={open} onClose={this.handleToggle}>
                <DialogTitle id="form-dialog-title">Adicionar um Paciente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, preencha os dados abaixo:
                </DialogContentText>
                    <form onSubmit={event => this.handleSubmit()}>
                        <TextField className={classes.FormControl} id="nome" label="Nome Completo" value={nome} onChange={this.handleChange('nome')} margin="normal" required />
                        <TextField className={classes.FormControlNumbers} id="cpf" label="CPF" value={cpf} onChange={this.handleChange('cpf')} type="number" margin="normal" required />
                        <TextField className={classes.FormControlNumbers} id="telefone" label="Telefone" value={telefone} onChange={this.handleChange('telefone')} type="number" margin="normal" />
                        <TextField className={classes.FormControl} id="email" label="Email" value={email} onChange={this.handleChange('email')} type="email" margin="normal" />
                        <TextField className={classes.FormControlNumbers} id="dataNasc" label="Data de Nascimento" value={dataNasc} onChange={this.handleChange('dataNasc')} type="date" margin="normal" InputLabelProps={{ shrink: true }} />
                        <FormControl className={classes.Select}>
                            <InputLabel shrink id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                native
                                value={sexo}
                                onChange={this.handleChange('sexo')}>
                                <option value='F'>Feminino</option>
                                <option value='M'>Masculino</option>
                                <option value='N'>Prefiro Não Dizer</option>
                            </Select>
                        </FormControl>
                        <TextField className={classes.FormControl} id="endereco" label="Endereço" value={endereco} onChange={this.handleChange('endereco')} margin="normal" />
                        <TextField className={classes.FormControlNumbers} id="cep" label="CEP" value={cep} onChange={this.handleChange('cep')} type="number" margin="normal" />
                        <TextField className={classes.FormControl} id="obs" label="Observações" value={obs} onChange={this.handleChange('obs')} margin="normal" multiline rows="3" />
                    </form>
                </DialogContent>
                <DialogActions>
                        <Button color="primary" align="center" variant="contained" onClick={this.handleSubmit}>
                            Adicionar
                        </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={this.state.openSucess} autoHideDuration={3000} onClose={this.handleToogleSnackbar}>
                <Alert severity="success" onClose={this.handleToogleSnackbar}>
                    Paciente cadastrado com sucesso!
            </Alert>
            </Snackbar>
        </Fragment >
        )
    }
})
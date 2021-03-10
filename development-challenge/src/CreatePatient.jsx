import React from 'react'
import { Fragment, Component } from 'react'
import { Dialog, Button, Fab, TextField, Select, InputLabel } from '@material-ui/core/';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';


export default class CreatePatient extends Component {

    state = {
        open: false,
        form: {
            nome: '',
            cpf: '',
            endereco: '',
            telefone: '',
            dataNasc: '',
            sexo: '',
            obs: ''
        }
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleChange = nome => ({ target: { value } }) => {
        this.setState({
            ...this.state.form,
            [nome]: value,
        })
    }

    render() {
        const { open, form: { nome, cpf, endereco, telefone, dataNasc, sexo, obs } } = this.state
        return (<Fragment>
            <Fab color="primary" onClick={this.handleToggle} style={{ position: 'absolute', bottom: 5, right: 0, margin: 20 }}>
                <AddIcon />
            </Fab>
            {/* <Button variant="fab" onClick={this.handleToggle} mini color="inherit">
                <AddIcon />
            </Button> */}
            <Dialog open={open} onClose={this.handleToggle}>
                <DialogTitle id="form-dialog-title">Adicionar um Paciente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, preencha os dados abaixo:
                </DialogContentText>
                    <form>
                        <TextField id="nome" label="Nome" value={nome} onChange={this.handleChange('nome')} margin="normal" />
                        <TextField id="cpf" label="CPF" value={cpf} onChange={this.handleChange('cpf')} type="number" margin="normal" />
                        <br />
                        <TextField id="telefone" label="Telefone" value={telefone} onChange={this.handleChange('telefone')} type="number" margin="normal" />
                        <TextField id="dataNasc" label="Data de Nascimento" value={dataNasc} onChange={this.handleChange('dataNasc')} type="date" margin="normal" InputLabelProps={{ shrink: true }} />
                        <InputLabel htmlFor="filled-age-native-simple">Age</InputLabel>
                        <Select
                            native
                            value={sexo}
                            onChange={this.handleChange('sexo')}
                            inputProps={{
                                name: 'sexo',
                                id: 'sexo',
                            }}
                        >
                            <option value='F'>Feminino</option>
                            <option value='M'>Masculino</option>
                            <option value='N'>Prefiro Não Dizer</option>
                        </Select>
                        <br />
                        <TextField id="endereco" label="Endereço" value={endereco} onChange={this.handleChange('endereco')} margin="normal" />
                        <br />
                        <TextField id="obs" label="Observações" value={obs} onChange={this.handleChange('obs')} margin="normal" multiline rows="4" />

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" align="center">
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
        )
    }
}

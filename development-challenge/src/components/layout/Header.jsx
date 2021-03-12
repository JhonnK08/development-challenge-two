import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    Menu: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    list: {
        width: 250,
    },
      fullList: {
        width: 'auto',
    },
  }));

export default function Menu() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
              <ListItem button key={'Contato'}>
                <ListItemIcon><MailIcon/></ListItemIcon>
                <ListItemText primary={'Contato'} />
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem button key={'Sobre'}>
                <ListItemIcon><InfoIcon/></ListItemIcon>
                <ListItemText primary={'Sobre'} />
              </ListItem>
          </List>
        </div>
      );
    return (
    <div className="Menu">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{flex: 1}}>
            Controle de Pacientes
          </Typography>
          <img src="https://medcloud.link/svgs/medcloud-white.svg" alt="Logo Medcloud" width="100"/>
        </Toolbar>
      </AppBar>
      <div>
        <React.Fragment key={'left'}>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
    </div>
    );
}